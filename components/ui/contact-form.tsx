"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Mail, User, MessageSquare, ArrowRight, Send } from "lucide-react";
import { SocialPanel } from "./social-card";

interface ContactFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export const ContactForm = React.forwardRef<HTMLDivElement, ContactFormProps>(
  ({ className, ...props }, ref) => {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [message, setMessage] = React.useState("");
    const [sent, setSent] = React.useState(false);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setSent(true);
      setTimeout(() => setSent(false), 3000);
    };

    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.1 },
      },
    };

    const itemVariants = {
      hidden: { y: 20, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: { type: "spring" as const, stiffness: 100 },
      },
    };

    return (
      <div
        className={cn("w-full mx-auto", className)}
        ref={ref}
        {...props}
      >
        <div
          className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "14px",
          }}
        >
          {/* Left: Form */}
          <motion.div
            className="p-5 sm:p-8 lg:p-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="mb-8">
              <h3
                className="text-3xl md:text-4xl font-bold tracking-tight mb-3"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Let's build something.
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#737373" }}>
                Open to roles, collaborations, and interesting problems.
              </p>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name + Email row */}
              <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  className="flex items-center gap-3 px-4 py-3 rounded-xl"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <User className="h-4 w-4 shrink-0" style={{ color: "#525252" }} />
                  <input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-transparent text-sm text-white placeholder:text-neutral-600 focus:outline-none"
                    aria-label="Name"
                    required
                  />
                </div>
                <div
                  className="flex items-center gap-3 px-4 py-3 rounded-xl"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <Mail className="h-4 w-4 shrink-0" style={{ color: "#525252" }} />
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent text-sm text-white placeholder:text-neutral-600 focus:outline-none"
                    aria-label="Email"
                    required
                  />
                </div>
              </motion.div>

              {/* Message */}
              <motion.div
                variants={itemVariants}
                className="flex gap-3 px-4 py-3 rounded-xl"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <MessageSquare className="h-4 w-4 shrink-0 mt-0.5" style={{ color: "#525252" }} />
                <textarea
                  placeholder="What are you working on?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="w-full bg-transparent text-sm text-white placeholder:text-neutral-600 focus:outline-none resize-none"
                  aria-label="Message"
                  required
                />
              </motion.div>

              {/* Submit */}
              <motion.div variants={itemVariants} className="flex items-center gap-5 pt-2">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-semibold transition-all duration-200"
                  style={{
                    background: sent ? "rgba(34,197,94,0.15)" : "#e70814",
                    color: sent ? "#22c55e" : "#000",
                    border: sent ? "1px solid rgba(34,197,94,0.3)" : "none",
                  }}
                >
                  {sent ? "Sent!" : (
                    <>Send message <Send className="h-3.5 w-3.5" /></>
                  )}
                </button>
                <a
                  href="mailto:kevadiyaparth1611@gmail.com"
                  className="text-xs flex items-center gap-1 transition-colors group"
                  style={{ color: "#525252" }}
                >
                  or email directly
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </a>
              </motion.div>
            </form>
          </motion.div>

          {/* Right: Social Panel */}
          <div
            className="hidden lg:flex items-stretch"
            style={{ borderLeft: "1px solid rgba(255,255,255,0.05)" }}
          >
            <SocialPanel />
          </div>
        </div>
      </div>
    );
  }
);

ContactForm.displayName = "ContactForm";
