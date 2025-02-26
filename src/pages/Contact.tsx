import ContactForm from "@/components/contact/ContactForm";

export default function Contact() {
  return (
    <div className="container py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Contact Us</h1>
        <ContactForm />
      </div>
    </div>
  );
}
