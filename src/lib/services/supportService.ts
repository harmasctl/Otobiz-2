import { supabase } from "../supabase";
import { logActivity } from "../activity";
import { sendNotification } from "./notificationService";

type TicketStatus = "open" | "in_progress" | "resolved" | "closed";
type TicketPriority = "low" | "medium" | "high" | "urgent";

interface CreateTicketData {
  userId: string;
  subject: string;
  description: string;
  category: string;
  priority?: TicketPriority;
}

interface UpdateTicketData {
  status?: TicketStatus;
  priority?: TicketPriority;
  assignedTo?: string;
}

export async function createTicket(data: CreateTicketData) {
  try {
    const { data: ticket, error } = await supabase
      .from("support_tickets")
      .insert({
        user_id: data.userId,
        subject: data.subject,
        description: data.description,
        category: data.category,
        priority: data.priority || "medium",
        status: "open",
      })
      .select()
      .single();

    if (error) throw error;

    await logActivity({
      userId: data.userId,
      action: "created_ticket",
      entityType: "support_ticket",
      entityId: ticket.id,
      details: { subject: data.subject, category: data.category },
    });

    // Notify admins
    const { data: admins } = await supabase
      .from("users")
      .select("id")
      .eq("role", "admin");

    if (admins) {
      admins.forEach((admin) => {
        sendNotification({
          userId: admin.id,
          title: "New Support Ticket",
          message: `New ticket: ${data.subject}`,
          type: "info",
          link: `/admin/support/tickets/${ticket.id}`,
        });
      });
    }

    return ticket;
  } catch (error) {
    console.error("Error creating ticket:", error);
    throw error;
  }
}

export async function updateTicket(ticketId: string, data: UpdateTicketData) {
  try {
    const { error } = await supabase
      .from("support_tickets")
      .update({
        ...data,
        updated_at: new Date().toISOString(),
      })
      .eq("id", ticketId);

    if (error) throw error;

    // Log activity
    await logActivity({
      userId: "system",
      action: "updated_ticket",
      entityType: "support_ticket",
      entityId: ticketId,
      details: data,
    });

    // Notify user if status changed
    if (data.status) {
      const { data: ticket } = await supabase
        .from("support_tickets")
        .select("user_id, subject")
        .eq("id", ticketId)
        .single();

      if (ticket) {
        sendNotification({
          userId: ticket.user_id,
          title: "Ticket Status Updated",
          message: `Your ticket "${ticket.subject}" has been marked as ${data.status}`,
          type: "info",
          link: `/support/tickets/${ticketId}`,
        });
      }
    }
  } catch (error) {
    console.error("Error updating ticket:", error);
    throw error;
  }
}

export async function addMessage({
  ticketId,
  userId,
  message,
  attachments = [],
}: {
  ticketId: string;
  userId: string;
  message: string;
  attachments?: string[];
}) {
  try {
    const { data, error } = await supabase
      .from("support_messages")
      .insert({
        ticket_id: ticketId,
        user_id: userId,
        message,
        attachments,
      })
      .select()
      .single();

    if (error) throw error;

    // Get ticket details
    const { data: ticket } = await supabase
      .from("support_tickets")
      .select("user_id, assigned_to")
      .eq("id", ticketId)
      .single();

    if (ticket) {
      // Notify the other party
      const notifyUserId =
        userId === ticket.user_id ? ticket.assigned_to : ticket.user_id;

      if (notifyUserId) {
        sendNotification({
          userId: notifyUserId,
          title: "New Support Message",
          message: "You have a new message in your support ticket",
          type: "info",
          link: `/support/tickets/${ticketId}`,
        });
      }
    }

    return data;
  } catch (error) {
    console.error("Error adding message:", error);
    throw error;
  }
}

export async function addNote({
  ticketId,
  userId,
  note,
}: {
  ticketId: string;
  userId: string;
  note: string;
}) {
  try {
    const { data, error } = await supabase
      .from("support_ticket_notes")
      .insert({
        ticket_id: ticketId,
        user_id: userId,
        note,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error adding note:", error);
    throw error;
  }
}

export async function getTickets({
  userId,
  status,
  category,
  priority,
  assignedTo,
  limit = 50,
  offset = 0,
}: {
  userId?: string;
  status?: TicketStatus;
  category?: string;
  priority?: TicketPriority;
  assignedTo?: string;
  limit?: number;
  offset?: number;
}) {
  try {
    let query = supabase
      .from("support_tickets")
      .select("*, user:users(id, full_name, email)")
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (userId) query = query.eq("user_id", userId);
    if (status) query = query.eq("status", status);
    if (category) query = query.eq("category", category);
    if (priority) query = query.eq("priority", priority);
    if (assignedTo) query = query.eq("assigned_to", assignedTo);

    const { data, error } = await query;

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching tickets:", error);
    throw error;
  }
}
