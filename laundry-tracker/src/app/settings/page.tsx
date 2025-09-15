"use client";
import { subscribeWebPush } from "@/lib/push";
import { useState } from "react";

export default function SettingsPage() {
  const [msg, setMsg] = useState<string>("");

  const onSub = async () => {
    try {
      await subscribeWebPush();
      setMsg("Subscribed to web push!");
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : String(e);
      setMsg("Failed: " + errorMessage);
    }
  };

  const onTest = async () => {
    const r = await fetch("/api/push/send-test", { method: "POST" });
    const j = await r.json();
    setMsg(j.ok ? "Sent test push!" : "Error: " + j.error);
  };

  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Settings</h1>
      <button onClick={onSub} className="px-4 py-2 rounded bg-black text-white">Enable Web Push</button>
      <button onClick={onTest} className="px-4 py-2 rounded bg-gray-800 text-white">Send Test Push</button>
      <div className="text-sm text-gray-700">{msg}</div>
    </main>
  );
}
