"use client";

import { motion } from "framer-motion";
import { CheckCircle2, MessageCircle, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
import { useT } from "@/lib/i18n";

export function ContactSection() {
  const { t } = useT();
  const serviceOptions = t("contact.serviceOpts").split("|");
  const [formData, setFormData] = useState({
    name: "",
    service: "",
    budget: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    const lines = [
      `${t("contact.wa.header")}`,
      `${t("contact.wa.from")}`,
      "",
      `${t("contact.wa.name")} ${formData.name}`,
      `${t("contact.wa.service")} ${formData.service}`,
      `${t("contact.wa.budget")} ${formData.budget}`,
      "",
      `${t("contact.wa.message")}`,
      formData.message,
    ];

    const text = encodeURIComponent(lines.join("\n"));
    const waUrl = `https://wa.me/51926948155?text=${text}`;

    setTimeout(() => {
      window.open(waUrl, "_blank", "noopener,noreferrer");
      setSending(false);
      setSubmitted(true);
    }, 250);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const inputStyles =
    "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-foreground-muted/50 transition-all focus:border-accent/50 focus:bg-white/[0.05] focus:outline-none focus:ring-2 focus:ring-accent/20";
  const selectStyles = `${inputStyles} appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20fill%3D%22%23a1a1aa%22%20d%3D%22M6%208L1%203h10z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px] bg-[right_16px_center] bg-no-repeat pr-10 [&>option]:bg-[#1a1a1a] [&>option]:text-white`;

  return (
    <section id="contact" className="relative overflow-hidden py-16 md:py-28">
      <div
        className="absolute right-0 bottom-0 h-[450px] w-[450px] rounded-full bg-accent/4 blur-[100px] pointer-events-none"
        style={{ transform: "translateZ(0)" }}
      />

      <div className="relative z-10 section-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto w-full max-w-3xl"
        >
          <div className="mb-8 space-y-4 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-accent font-medium">{t("contact.label")}</p>
            <h2 className="text-3xl font-semibold leading-tight sm:text-4xl md:text-6xl">
              {t("contact.h2.1")} <br className="hidden sm:block" />
              <span className="text-gradient-flow text-glow-pulse">{t("contact.h2.2")}</span>
            </h2>
            <p className="mx-auto max-w-2xl text-base text-foreground-muted sm:text-lg">{t("contact.sub")}</p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 shadow-2xl backdrop-blur-xl sm:rounded-3xl sm:p-7 md:p-8">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center gap-6 py-12 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                    className="flex h-20 w-20 items-center justify-center rounded-full bg-green-500/15 text-green-400"
                  >
                    <CheckCircle2 className="h-10 w-10" />
                  </motion.div>

                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-white">{t("contact.form.success.title")}</h3>
                    <p className="text-foreground-muted">{t("contact.form.success.sub")}</p>
                  </div>

                  <Button
                    variant="secondary"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", service: "", budget: "", message: "" });
                    }}
                  >
                    {t("contact.form.success.action")}
                  </Button>
                </motion.div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white sm:text-2xl">{t("contact.form.title")}</h3>
                    <p className="text-sm text-foreground-muted">{t("contact.form.sub")}</p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="text-xs font-medium uppercase tracking-wider text-foreground-muted">
                        {t("contact.form.name")}
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={inputStyles}
                        placeholder={t("contact.form.name.ph")}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="budget" className="text-xs font-medium uppercase tracking-wider text-foreground-muted">
                        {t("contact.form.budget")}
                      </label>
                      <input
                        id="budget"
                        name="budget"
                        type="text"
                        required
                        value={formData.budget}
                        onChange={handleChange}
                        className={inputStyles}
                        placeholder={t("contact.form.budget.ph")}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="service" className="text-xs font-medium uppercase tracking-wider text-foreground-muted">
                      {t("contact.form.service")}
                    </label>
                    <select
                      id="service"
                      name="service"
                      required
                      value={formData.service}
                      onChange={handleChange}
                      className={selectStyles}
                    >
                      <option value="" disabled>
                        {t("contact.form.select")}
                      </option>
                      {serviceOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="message" className="text-xs font-medium uppercase tracking-wider text-foreground-muted">
                      {t("contact.form.message")}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className={`${inputStyles} resize-none`}
                      placeholder={t("contact.form.message.ph")}
                    />
                  </div>

                  <Button type="submit" className="w-full h-14 text-base font-semibold group shine-hover" disabled={sending}>
                    {sending ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        {t("contact.form.sending")}
                      </>
                    ) : (
                      <>
                        <MessageCircle className="mr-2 h-5 w-5" />
                        {t("contact.form.submit")}
                        <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
