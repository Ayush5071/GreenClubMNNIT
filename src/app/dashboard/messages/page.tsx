"use client";
import { useEffect, useState } from "react";

interface ContactMessage {
  _id: string;
  name: string;
  contact: string;
  message: string;
  createdAt: string;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/contactMessage")
      .then((res) => res.json())
      .then((data) => {
        setMessages(data.messages || []);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load messages");
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-green-950 p-6">
      <div className="max-w-3xl mx-auto bg-zinc-900/80 rounded-2xl shadow-lg p-6 border border-green-500/20 mt-10">
        <h1 className="text-3xl font-bold text-green-400 mb-6 text-center">Contact Messages</h1>
        {loading ? (
          <div className="text-center text-gray-300">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-400">{error}</div>
        ) : messages.length === 0 ? (
          <div className="text-center text-gray-400">No messages found.</div>
        ) : (
          <div className="space-y-6">
            {messages.map((msg) => (
              <div key={msg._id} className="bg-zinc-800/80 rounded-xl p-4 border border-green-500/10">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-green-300">{msg.name}</span>
                  <span className="text-xs text-gray-400">{new Date(msg.createdAt).toLocaleString()}</span>
                </div>
                <div className="text-sm text-gray-300 mb-1">
                  <span className="font-semibold">Contact:</span> {msg.contact}
                </div>
                <div className="text-gray-200 whitespace-pre-line">{msg.message}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
