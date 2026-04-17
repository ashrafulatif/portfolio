"use server";

import { sendEmail } from "@/utils/sendEmail";

export async function sendContactAction(formData: {
  name: string;
  email: string;
  message: string;
}) {
  const { name, email, message } = formData;

  if (!name || !email || !message) {
    return { success: false, error: "Please fill in all fields." };
  }

  const subject = `New Portfolio Message from ${name}`;
  const receiverEmail = process.env.CONTACT_RECEIVER || "ashrafulhaque08@mail.com";

  const html = `
    <div style="font-family: sans-serif; padding: 20px; color: #0F172A;">
      <h2 style="color: #2DD4BF;">New Message from Portfolio</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <hr style="border: none; border-top: 1px solid #E2E8F0; margin: 20px 0;" />
      <p><strong>Message:</strong></p>
      <p style="white-space: pre-wrap;">${message}</p>
    </div>
  `;

  const result = await sendEmail({
    to: receiverEmail,
    subject,
    html,
  });

  if (result.success) {
    return { success: true };
  } else {
    return { success: false, error: "Failed to send message. Please try again later." };
  }
}
