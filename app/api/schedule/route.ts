import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";
import { sendEmail, escapeHtml, formatSubmittedAt } from "@/lib/email";

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
          { id: body.vehicleId },
        );
        vehicleName = v?.name || String(body.vehicleId);
      } catch (e) {
        console.warn("Could not fetch vehicle name for", body.vehicleId, e);
        vehicleName = String(body.vehicleId);
      }
    }

    const submittedAt = formatSubmittedAt(body.submittedAt);
    const html = `
      <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,\"Helvetica Neue\",Arial;line-height:1.4;color:#111">
        <h2>New service request</h2>
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
          <tr><td><strong>Vehicle</strong></td><td>${escapeHtml(
            vehicleName || body.vehicleId,
          )}</td></tr>
          <tr><td><strong>Current mileage</strong></td><td>${escapeHtml(
            body.mileage || "",
          )}</td></tr>
        </table>
        <h3>Details</h3>
        <div style="white-space:pre-wrap;background:#f7f7f8;padding:12px;border-radius:6px">${escapeHtml(
          body.notes || "",
        )}</div>
        <p style="color:#666;font-size:13px;margin-top:12px">This message was generated from the site schedule form.</p>
      </div>
    `;

    const result = await sendEmail({
      subject: `Service request from ${body.name || "Website"}`,
      html,
      replyTo: body.email,
    });

    console.log("Resend send result:", result);

    return NextResponse.json({ ok: true, result });
  } catch (err) {
    console.error("Error handling schedule submission", err);
    const errorMessage = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { ok: false, error: errorMessage },
      { status: 500 },
    );
  }
}
