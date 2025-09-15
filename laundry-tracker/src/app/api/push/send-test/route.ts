import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";
import webpush from "web-push";

export async function POST() {
  // Set VAPID details inside the function to avoid build-time issues
  webpush.setVapidDetails(
    process.env.WEB_PUSH_CONTACT!,
    process.env.WEB_PUSH_PUBLIC_VAPID_KEY!,
    process.env.WEB_PUSH_PRIVATE_VAPID_KEY!
  );
  const supabase = supabaseServer();
  const { data, error } = await supabase.from("subscriptions").select("*").limit(1);
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  if (!data?.length) return NextResponse.json({ ok: false, error: "No subscriptions" }, { status: 400 });

  const sub = {
    endpoint: data[0].endpoint,
    keys: { p256dh: data[0].p256dh, auth: data[0].auth }
  };

  try {
    await webpush.sendNotification(
      sub as webpush.PushSubscription,
      JSON.stringify({ title: "Laundry Test", body: "Hello from web push!", data: { url: "/" } })
    );
    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ ok: false, error: errorMessage }, { status: 500 });
  }
}
