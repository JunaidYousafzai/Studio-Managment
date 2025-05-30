import React, { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted!");
    console.log(formData);
  };

  return (
    <div className="container md:border-1  hover:border-pink-600 mx-auto max-w-md p-6 rounded-2xl bg-black shadow-input">
      <h2 className="text-2xl font-bold text-neutral-200 mb-6">
        Contact Us
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <LabelInputContainer>
          <label htmlFor="name" className="text-neutral-300 font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            className="bg-zinc-900 text-neutral-200 rounded-md border border-neutral-700 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </LabelInputContainer>

        {/* Email */}
        <LabelInputContainer>
          <label htmlFor="email" className="text-neutral-300 font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
            className="bg-zinc-900 text-neutral-200 rounded-md border border-neutral-700 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </LabelInputContainer>

        {/* Subject */}
        <LabelInputContainer>
          <label htmlFor="subject" className="text-neutral-300 font-medium">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Subject"
            className="bg-zinc-900 text-neutral-200 rounded-md border border-neutral-700 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </LabelInputContainer>

        <LabelInputContainer>
          <label htmlFor="message" className="text-neutral-300 font-medium">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            placeholder="Write your message here..."
            required
            className="bg-zinc-900 text-neutral-200 rounded-md border border-neutral-700 px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </LabelInputContainer>

        {/* Submit Button */}
        <button
          type="submit"
          className="group relative block w-full rounded-md bg-gradient-to-br from-zinc-900 to-neutral-700 px-6 py-3 text-white font-semibold shadow-md hover:from-purple-700 hover:to-pink-600 transition"
        >
          Send Message &rarr;
          <BottomGradient />
        </button>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-indigo-100 via-purple-400 to-pink-600 opacity-0 transition duration-500 group-hover:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent from-indigo-100 via-purple-400 to-pink-600 opacity-0 blur-sm transition duration-500 group-hover:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={`flex flex-col space-y-2 ${className || ""}`}>
      {children}
    </div>
  );
};
