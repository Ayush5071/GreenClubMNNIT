"use client";
import { useState } from "react";
import emailjs from "emailjs-com";

const Contact = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");

    const templateParams = {
      user_email: email,
      message,
    };

    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )
      .then(
        (response) => {
          console.log("Success:", response); // Log the successful response
          setStatus("Message sent successfully!");
          setEmail(""); // Reset email field
          setMessage(""); // Reset message field
        },
        (error) => {
          console.error("Failed to send message:", error); // Log the error
          setStatus("Failed to send message. Please try again.");
        }
      );
  };

  return (
    <section className="bg-zinc-950 py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
      <div className="bg-zinc-800 border-2 border-white rounded-2xl p-8 w-full shadow-xl">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-white">
          Contact Us
        </h2>
        <p className="mb-8 lg:mb-16 font-light text-center text-gray-400 sm:text-xl">
          Got a technical issue? Want to send feedback about a beta feature? Need details about our Business plan? Let us know.
        </p>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-white"
            >
              Your Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-zinc-900 text-white text-sm rounded-lg border-2 border-white focus:ring-green-500 focus:border-green-500 block w-full p-2.5 placeholder-gray-400"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label
              htmlFor="subject"
              className="block mb-2 text-sm font-medium text-white"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              required
              className="block p-3 w-full text-sm text-white bg-zinc-900 rounded-lg border-2 border-white shadow-sm focus:ring-green-500 focus:border-green-500"
              placeholder="Let us know how we can help you"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-white"
            >
              Your Message
            </label>
            <textarea
              id="message"
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="block p-2.5 w-full text-sm text-white bg-zinc-900 rounded-lg shadow-sm border-2 border-white focus:ring-green-500 focus:border-green-500"
              placeholder="Leave a comment..."
            ></textarea>
          </div>
          <button
            type="submit"
            className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-green-600 sm:w-fit hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300"
          >
            Send Message
          </button>
        </form>
        {status && (
          <p className="text-center mt-4 text-sm text-white font-semibold">
            {status}
          </p>
        )}
      </div>
    </section>
  );
};

export default Contact;
