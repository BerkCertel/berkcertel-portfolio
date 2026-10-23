import "server-only";

import nodemailer, { type Transporter } from "nodemailer";

import { getMailEnv } from "./env.server";
import { escapeHtml } from "./escape-html";

/** One labelled line of the contact email (label and value as shown to the owner). */
export interface MailField {
  label: string;
  value: string;
}

interface ContactMail {
  subject: string;
  replyTo: string;
  fields: MailField[];
  message: { label: string; value: string };
}

// Created once on first use (env values are only required when a mail is actually sent).
let transporter: Transporter | undefined;

function getTransporter() {
  if (!transporter) {
    const env = getMailEnv();
    transporter = nodemailer.createTransport({
      host: env.host,
      port: env.port,
      secure: env.secure,
      auth: { user: env.user, pass: env.pass },
    });
  }
  return transporter;
}

/** Sends the contact form to the owner as plain text + simple HTML (user input escaped). */
export async function sendContactMail({ subject, replyTo, fields, message }: ContactMail) {
  const { user, to } = getMailEnv();

  const text = [
    ...fields.map((field) => `${field.label}: ${field.value}`),
    "",
    `${message.label}:`,
    message.value,
  ].join("\n");

  const rows = fields
    .map(
      (field) =>
        `<tr><td style="padding:4px 16px 4px 0;color:#515a6e">${escapeHtml(field.label)}</td><td style="padding:4px 0">${escapeHtml(field.value)}</td></tr>`,
    )
    .join("");
  const html = `<table style="font:14px/1.5 sans-serif;border-collapse:collapse">${rows}</table>
<p style="font:14px/1.5 sans-serif;color:#515a6e;margin:20px 0 6px">${escapeHtml(message.label)}</p>
<p style="font:15px/1.6 sans-serif;white-space:pre-wrap;margin:0">${escapeHtml(message.value)}</p>`;

  await getTransporter().sendMail({ from: user, to, replyTo, subject, text, html });
}
