import { supabase } from "./supabase";
import { logActivity } from "./activity";

export async function uploadContentImage(file: File) {
  try {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `content/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("public")
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const {
      data: { publicUrl },
    } = supabase.storage.from("public").getPublicUrl(filePath);

    return publicUrl;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
}

export async function deleteContentImage(url: string) {
  try {
    const path = url.split("/").pop();
    if (!path) throw new Error("Invalid image URL");

    const { error } = await supabase.storage
      .from("public")
      .remove([`content/${path}`]);

    if (error) throw error;
  } catch (error) {
    console.error("Error deleting image:", error);
    throw error;
  }
}

export async function generateSlug(title: string) {
  const baseSlug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  // Check if slug exists
  const { data } = await supabase
    .from("content")
    .select("slug")
    .eq("slug", baseSlug)
    .single();

  if (!data) return baseSlug;

  // If slug exists, append a number
  let counter = 1;
  let newSlug = `${baseSlug}-${counter}`;

  while (true) {
    const { data } = await supabase
      .from("content")
      .select("slug")
      .eq("slug", newSlug)
      .single();

    if (!data) return newSlug;
    counter++;
    newSlug = `${baseSlug}-${counter}`;
  }
}

export async function publishContent(id: string, userId: string) {
  try {
    const { error } = await supabase
      .from("content")
      .update({
        status: "published",
        publish_date: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) throw error;

    await logActivity({
      userId,
      action: "published",
      entityType: "content",
      entityId: id,
    });
  } catch (error) {
    console.error("Error publishing content:", error);
    throw error;
  }
}
