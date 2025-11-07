import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RESEND_FROM = process.env.RESEND_FROM || "onboarding@resend.dev";
const RECIPIENT = "kiba741@gmail.com";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    console.log("Schedule submission received:", body);

    // Resolve vehicle name from Sanity (fall back to the raw id if not found)
    let vehicleName = "";
    if (body.vehicleId) {
      try {
        const v = await client.fetch<{ name?: string }>(
          `*[_type == "vehicle" && _id == $id][0]{name}`,
          { id: body.vehicleId }
        );
        vehicleName = v?.name || String(body.vehicleId);
      } catch (e) {
        console.warn("Could not fetch vehicle name for", body.vehicleId, e);
        vehicleName = String(body.vehicleId);
      }
    }

    // Build a simple HTML email summarizing the submission
    const submittedAtRaw = body.submittedAt || new Date().toISOString();
    const submittedAtDate = new Date(submittedAtRaw);
    const submittedAt = isNaN(submittedAtDate.getTime())
      ? String(submittedAtRaw)
      : submittedAtDate.toLocaleString("en-US", {
          dateStyle: "medium",
          timeStyle: "short",
        });
    const html = `
      <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,\"Helvetica Neue\",Arial;line-height:1.4;color:#111">
        <h2>New service request</h2>
        <p><strong>Submitted at:</strong> ${submittedAt}</p>
        <table cellpadding="4" style="border-collapse:collapse">
          <tr><td><strong>Name</strong></td><td>${escapeHtml(
            body.name
          )}</td></tr>
          <tr><td><strong>Email</strong></td><td>${escapeHtml(
            body.email
          )}</td></tr>
          <tr><td><strong>Phone</strong></td><td>${escapeHtml(
            body.phone
          )}</td></tr>
          <tr><td><strong>Vehicle</strong></td><td>${escapeHtml(
            vehicleName || body.vehicleId
          )}</td></tr>
          <tr><td><strong>Current mileage</strong></td><td>${escapeHtml(
            body.mileage || ""
          )}</td></tr>
          <tr><td><strong>Agreement</strong></td><td>${
            body.agree ? "Yes" : "No"
          }</td></tr>
        </table>
        <h3>Details</h3>
        <div style="white-space:pre-wrap;background:#f7f7f8;padding:12px;border-radius:6px">${escapeHtml(
          body.notes || ""
        )}</div>
        <p style="color:#666;font-size:13px;margin-top:12px">This message was generated from the site schedule form.</p>
      </div>
    `;

    // Send email using Resend HTTP API to avoid SDK typing/casting issues
    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY missing from environment.");
      return NextResponse.json(
        { ok: false, error: "Email service not configured." },
        { status: 500 }
      );
    }

    const apiResp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: RESEND_FROM,
        to: RECIPIENT,
        subject: `Service request from ${body.name || "Website"}`,
        html,
        headers: body.email ? { "Reply-To": body.email } : undefined,
      }),
    });

    const sendResult = await apiResp.json().catch(() => ({}));
    if (!apiResp.ok) {
      console.error("Resend API error", sendResult);
      return NextResponse.json(
        { ok: false, error: sendResult },
        { status: 502 }
      );
    }

    console.log("Resend send result:", sendResult);

    return NextResponse.json({ ok: true, result: sendResult });
  } catch (err) {
    console.error("Error handling schedule submission", err);
    return NextResponse.json(
      { ok: false, error: String(err) },
      { status: 500 }
    );
  }
}

// small helper to avoid injecting raw HTML
function escapeHtml(unsafe: unknown) {
  if (unsafe == null) return "";
  return String(unsafe)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
