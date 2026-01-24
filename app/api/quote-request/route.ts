import { NextResponse } from "next/server";
import { sendEmail, escapeHtml, formatSubmittedAt } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    console.log("Quote request submission received:", body);

    const submittedAt = formatSubmittedAt(body.submittedAt);

    const html = `
      <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,\"Helvetica Neue\",Arial;line-height:1.4;color:#111">
        <h2>New quote request</h2>
        <p><strong>Submitted at:</strong> ${submittedAt}</p>
        <table cellpadding="4" style="border-collapse:collapse">
          <tr><td><strong>Name</strong></td><td>${escapeHtml(
            body.name,
          )}</td></tr>
          <tr><td><strong>Email</strong></td><td>${escapeHtml(
            body.email,
          )}</td></tr>
          <tr><td><strong>Phone</strong></td><td>${escapeHtml(
            body.phone,
          )}</td></tr>
          <tr><td><strong>Product</strong></td><td>${escapeHtml(
            body.product,
          )}</td></tr>
          <tr><td><strong>Product Type</strong></td><td>${escapeHtml(
            body.productType,
          )}</td></tr>
          <tr><td><strong>City</strong></td><td>${escapeHtml(
            body.city,
          )}</td></tr>
          <tr><td><strong>Region</strong></td><td>${escapeHtml(
            body.region,
          )}</td></tr>
        </table>
        <h3>Message</h3>
        <div style="white-space:pre-wrap;background:#f7f7f8;padding:12px;border-radius:6px">${escapeHtml(
          body.message || "",
        )}</div>
        <p style="color:#666;font-size:13px;margin-top:12px">This message was generated from the quote request form.</p>
      </div>
    `;

    const result = await sendEmail({
      subject: `Quote request for ${body.product || body.productType} from ${body.name || "Website"}`,
      html,
      replyTo: body.email,
    });

    console.log("Resend send result:", result);

    return NextResponse.json({ ok: true, result });
  } catch (err) {
    console.error("Error handling quote request submission", err);
    const errorMessage = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { ok: false, error: errorMessage },
      { status: 500 },
    );
  }
}
