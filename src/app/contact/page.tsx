"use client";

import React from "react";
import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex items-center justify-center px-4">
      <div className="max-w-lg w-full bg-gray-800 rounded-lg shadow-lg p-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Contact Me</h1>
        <p className="mb-6 text-gray-300">
          Thank you for trying out my project! 😊 <br />
          I&apos;m a fresher and I&apos;m trying to learn new things every day. <br />
          Feel free to reach out to me:
        </p>

        <div className="space-y-4">
          {/* LinkedIn */}
          <p>
            <span className="font-semibold">LinkedIn:</span>{" "}
            <Link
              href="https://www.linkedin.com/in/your-linkedin-id"
              target="_blank"
              className="text-indigo-400 hover:underline"
            >
              linkedin.com/in/your-linkedin-id
            </Link>
          </p>

          {/* Email */}
          <p>
            <span className="font-semibold">Email:</span>{" "}
            <a
              href="mailto:your-email@example.com"
              className="text-indigo-400 hover:underline"
            >
              your-email@example.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
