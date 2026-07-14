# Contact Form

The contact section includes a working form that posts to an API route. Out of the box it validates input and logs submissions to the server console — you connect it to your email provider of choice.

## How it works

- **UI:** `src/components/ContactForm.tsx` (labels come from the `contact.form` namespace in `messages/*.json`).
- **Endpoint:** `src/app/api/contact/route.ts` — a Next.js Route Handler (`POST /api/contact`).

The endpoint performs:

- **JSON parsing** with a `400` on malformed bodies.
- **Honeypot** — a hidden `website` field; if filled, the request is silently accepted (bot trap) and ignored.
- **Validation:**
  - `name`: 2–80 characters
  - `email`: valid format, max 120 characters
  - `message`: 10–2000 characters

On success it returns `{ ok: true }`.

## Connecting an email provider

Open `src/app/api/contact/route.ts` and replace the demo block:

```ts
// Demo inbox — swap for email provider / Formspree / Resend later
console.info("[contact]", { name, email, message, at: new Date().toISOString() });

return NextResponse.json({ ok: true });
```

### Option A — Resend (recommended)

```bash
npm install resend
```

```ts
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: "Portfolio <noreply@yourdomain.com>",
  to: "you@yourdomain.com",
  subject: `New message from ${name}`,
  replyTo: email,
  text: message,
});

return NextResponse.json({ ok: true });
```

Add `RESEND_API_KEY` to your environment (see below).

### Option B — Formspree / other webhook

Forward the payload to your webhook URL:

```ts
await fetch(process.env.FORM_WEBHOOK_URL!, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name, email, message }),
});
```

### Option C — Nodemailer (SMTP)

Install `nodemailer` and send through your SMTP credentials inside the handler.

## Environment variables

Create a `.env.local` file in the project root (never commit it):

```bash
RESEND_API_KEY=your_key_here
# or
FORM_WEBHOOK_URL=https://…
```

Set the same variables in your hosting provider's dashboard for production (see **[deployment.md](./deployment.md)**).

## Customizing messages

Success/error/label text lives under `contact.form` in `messages/tr.json` and `messages/en.json`. The email button label is `contact.emailBtn`.
