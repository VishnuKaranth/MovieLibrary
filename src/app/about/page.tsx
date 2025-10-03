"use client";

import React from "react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex items-center justify-center px-4">
      <div className="max-w-3xl w-full bg-gray-800 rounded-lg shadow-lg p-8 text-center">
        <h1 className="text-3xl font-bold mb-4">About Me</h1>
        <p className="mb-6 text-gray-300 leading-relaxed">
          Hello, I'm <span className="text-indigo-400 font-semibold">Vishnu</span>, 
          a fresher passionate about software development.  
          I enjoy working with modern technologies like{" "}
          <span className="text-yellow-300">JavaScript, Python, and Java</span>, 
          and I'm constantly learning new skills to grow as a full-stack developer.  
        </p>
        <div className="mb-6">
          <Link
            href="/resume.pdf"
            target="_blank"
            className="px-6 py-2 rounded-md bg-indigo-500 hover:bg-indigo-600 transition-colors font-semibold text-white"
          >
             Download My Resume
          </Link>
        </div>
        <div className="text-left space-y-4">
          <h2 className="text-2xl font-semibold mb-2 text-indigo-400">
            What I Do
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li> Build full-stack web apps using MERN / Django + React.</li>
            <li> Write clean, efficient, and maintainable code in Python and Java.</li>
            <li> Work with databases like MongoDB, PostgreSQL, and MySQL.</li>
            <li> Create responsive UIs with React and TailwindCSS.</li>
            <li> Experiment with AI and automation tools.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
