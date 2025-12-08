// src/components/Contact.jsx
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, FileText, Copy } from "lucide-react";
import emailjs from "@emailjs/browser";

// env names must match your .env.local exactly
const EMAIL_JS_SERVICE_ID = import.meta.env.VITE_EMAIL_JS_SERVICE_ID;
const EMAIL_JS_TEMPLATE_ID = import.meta.env.VITE_EMAIL_JS_TEMPLATE_ID;
const EMAIL_JS_PUBLIC_KEY = import.meta.env.VITE_EMAIL_JS_PUBLIC_KEY;

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(null);

  const formRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    if (EMAIL_JS_PUBLIC_KEY) {
      try {
        emailjs.init(EMAIL_JS_PUBLIC_KEY);
        console.log("EmailJS initialized");
      } catch (err) {
        console.warn("EmailJS init error:", err);
      }
    } else {
      console.warn("EMAIL_JS_PUBLIC_KEY is missing!");
    }
  }, []);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Please enter your name";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email))
      e.email = "Enter a valid email";
    if (!form.subject || form.subject.trim().length < 3)
      e.subject = "Subject too short";
    if (!form.message || form.message.trim().length < 10)
      e.message = "Message must be at least 10 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const send = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;

    if (!EMAIL_JS_SERVICE_ID || !EMAIL_JS_TEMPLATE_ID) {
      setStatus({
        ok: false,
        message:
          "EmailJS service/template IDs are not configured. Check .env and restart dev server.",
      });
      return;
    }

    setSending(true);
    setStatus(null);

    try {
      // IMPORTANT: visible input names must match the template variable names in EmailJS
      // We're using sendForm so it serializes the formRef DOM node
      const res = await emailjs.sendForm(
        EMAIL_JS_SERVICE_ID,
        EMAIL_JS_TEMPLATE_ID,
        formRef.current,
        EMAIL_JS_PUBLIC_KEY
      );

      console.log("EmailJS send success:", res);
      setStatus({
        ok: true,
        message: "Message sent — thanks! I’ll get back within 48 hours.",
      });
      setForm({ name: "", email: "", subject: "", message: "" });
      // reset native form if needed
      formRef.current?.reset();
    } catch (err) {
      console.error("EmailJS send error:", err);
      const msg =
        err?.text ||
        err?.message ||
        "Could not send the message. Try again later.";
      setStatus({ ok: false, message: msg });
    } finally {
      setSending(false);
    }
  };

  const copyEmail = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setStatus({ ok: true, message: "Email copied to clipboard" });
    } catch {
      setStatus({ ok: false, message: "Could not copy" });
    }
  };

  return (
    <section
      className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
      style={{ background: "#0b0b0d" }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
        <motion.div
          ref={cardRef}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          className="contact-glass hover-blue-border p-5 sm:p-6"
          style={{ transform: "perspective(900px)" }}
        >
          <h2 className="text-2xl font-semibold text-[#eae6f7]">Contact</h2>
          <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
            Friendly, fast replies. Tell me about the project, deadline and
            budget.
          </p>

          <div className="mt-6 space-y-3">
            <ContactMethod
              icon={<Mail size={18} />}
              label="Email"
              value="abhishekkumarprasad03@gmail.com"
              onCopy={() => copyEmail("abhishekkumarprasad03@gmail.com")}
            />
            <ContactMethod
              icon={<Phone size={18} />}
              label="Phone"
              value="(+91) 69016 15371"
            />
            <ContactMethod
              icon={<MapPin size={18} />}
              label="Location"
              value="Assam, India"
            />
          </div>

          <div className="mt-5 flex items-center gap-3">
            <a
              target="_blank"
              rel="noreferrer noopener"
              href="mailto:abhishekkumarprasad03@gmail.com"
              className="ml-auto inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-transform duration-200 hover:scale-105"
              style={{
                background: "linear-gradient(90deg,#26C6DA,#26C6DA)",
                color: "white",
              }}
            >
              <Mail size={16} /> Email me
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          className="contact-glass hover-blue-border overflow-hidden"
        >
          <div className="p-4 sm:p-6">
            <h3 className="text-lg font-semibold text-[#eae6f7]">
              Send a message
            </h3>
            <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
              Short, clear messages get fastest replies.
            </p>

            {/* formRef used by emailjs.sendForm */}
            <form ref={formRef} onSubmit={send} className="mt-4 space-y-3">
              {/* Visible inputs - these names must match your EmailJS template variables */}
              <FloatingInput
                id="name"
                name="from_name"
                label="Full name"
                value={form.name}
                onChange={(v) => setForm((s) => ({ ...s, name: v }))}
                error={errors.name}
              />
              <FloatingInput
                id="email"
                name="from_email"
                label="Email address"
                value={form.email}
                onChange={(v) => setForm((s) => ({ ...s, email: v }))}
                error={errors.email}
                type="email"
              />
              <FloatingInput
                id="subject"
                name="subject"
                label="Subject"
                value={form.subject}
                onChange={(v) => setForm((s) => ({ ...s, subject: v }))}
                error={errors.subject}
              />

              <label className="block">
                <span className="text-sm" style={{ color: "var(--muted)" }}>
                  Message
                </span>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={(e) =>
                    setForm((s) => ({ ...s, message: e.target.value }))
                  }
                  rows={5}
                  className="mt-2 w-full rounded-lg border px-4 py-3 placeholder-transparent focus:outline-none focus:ring-2 transition bg-transparent"
                  style={{
                    borderColor: "rgba(255,255,255,0.04)",
                    color: "#e6e1f2",
                  }}
                  placeholder="Tell me about the project, what you need and any links"
                  aria-label="Message"
                />
                {errors.message && (
                  <div className="text-rose-600 text-sm mt-1">
                    {errors.message}
                  </div>
                )}
              </label>

              <div className="flex justify-end">
                <motion.button
                  type="submit"
                  whileTap={{ scale: 0.98 }}
                  disabled={sending}
                  className="inline-flex items-center cursor-pointer gap-2 px-4 py-2 rounded-md text-sm font-medium shadow select-none disabled:opacity-60 transition-transform duration-200 hover:scale-105"
                  style={{
                    background: "linear-gradient(90deg,#26C6DA,#26C6DA)",
                    color: "white",
                  }}
                >
                  {sending ? (
                    "Sending..."
                  ) : (
                    <>
                      <FileText size={16} />
                      <span className="ml-1">Send</span>
                    </>
                  )}
                </motion.button>
              </div>

              {status && (
                <div
                  className="mt-2 px-3 py-2 rounded-md text-sm"
                  role="status"
                  style={{
                    background: status.ok
                      ? "rgba(16,185,129,0.08)"
                      : "rgba(239,68,68,0.08)",
                    color: status.ok ? "var(--primary)" : "var(--accent)",
                  }}
                >
                  {status.message}
                </div>
              )}

              <div className="mt-2 text-xs" style={{ color: "var(--muted)" }}>
                By clicking send you agree that the details will be used to
                contact you. I do not store attachments long-term in this demo.
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Subcomponents ---------- */

function ContactMethod({ icon, label, value, onCopy }) {
  return (
    <div
      className="flex items-center gap-3 rounded-lg p-3"
      style={{
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.01), transparent)",
        border: "1px solid rgba(255,255,255,0.03)",
      }}
    >
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center"
        style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.03)",
        }}
      >
        {icon}
      </div>
      <div className="flex-1">
        <div className="text-sm font-medium" style={{ color: "#e6e1f2" }}>
          {label}
        </div>
        <div className="text-xs" style={{ color: "var(--muted)" }}>
          {value}
        </div>
      </div>
      {onCopy && (
        <button
          onClick={onCopy}
          className="p-2 rounded-md border"
          style={{ borderColor: "rgba(255,255,255,0.04)", color: "#ddd" }}
        >
          <Copy size={14} />
        </button>
      )}
    </div>
  );
}

function FloatingInput({
  id,
  name,
  label,
  value,
  onChange,
  error,
  type = "text",
}) {
  return (
    <label className="block">
      <span className="sr-only">{label}</span>
      <input
        id={id}
        name={name || id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="peer w-full rounded-lg px-4 py-3 placeholder-transparent focus:outline-none focus:ring-2 transition"
        placeholder={label}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        style={{
          border: "1px solid rgba(255,255,255,0.04)",
          background: "transparent",
          color: "#e6e1f2",
        }}
      />
      <div className="mt-1 text-xs" style={{ color: "var(--muted)" }}>
        {label}
      </div>
      {error && (
        <div id={`${id}-error`} className="text-rose-600 text-sm mt-1">
          {error}
        </div>
      )}
    </label>
  );
}
