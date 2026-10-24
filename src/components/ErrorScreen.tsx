import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Logo } from "@/components/Logo";

type ErrorScreenProps = {
  code: string;
  title: string;
  description: ReactNode;
  actions: ReactNode;
};

/** Shared full-page screen for "page not found" and "something went wrong", in the site theme. */
export const ErrorScreen = ({ code, title, description, actions }: ErrorScreenProps) => (
  <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-16 text-center text-foreground">
    <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <div className="h-[36rem] w-[36rem] max-w-[120vw] rounded-full bg-primary/15 blur-[140px]" />
    </div>

    <a href="/" aria-label="Mohanad Abubaker home" className="absolute left-6 top-6">
      <Logo className="h-9 w-auto" />
    </a>

    <div className="relative z-10 flex flex-col items-center">
      <motion.p
        initial={{ opacity: 0, letterSpacing: "0.4em", filter: "blur(12px)" }}
        animate={{ opacity: 1, letterSpacing: "0em", filter: "blur(0px)" }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden="true"
        className="select-none font-display text-[32vw] leading-none text-primary drop-shadow-[0_0_40px_hsl(var(--primary)/0.6)] sm:text-[13rem]"
      >
        {code}
      </motion.p>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mb-6 mt-2 h-px w-32 bg-gradient-to-r from-transparent via-primary to-transparent"
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="flex flex-col items-center"
      >
        <h1 className="mb-3 font-display text-4xl sm:text-5xl">{title}</h1>
        <div className="mx-auto mb-10 max-w-md leading-relaxed text-muted-foreground">{description}</div>
        <div className="flex flex-col items-center gap-3 sm:flex-row">{actions}</div>
      </motion.div>
    </div>
  </main>
);

export const errorPrimaryBtn =
  "group inline-flex min-h-11 items-center gap-2.5 rounded-full border border-primary bg-primary px-7 py-3 text-sm font-medium text-primary-foreground transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--primary)/0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
export const errorGhostBtn =
  "group inline-flex min-h-11 items-center gap-2.5 rounded-full border border-primary/50 px-7 py-3 text-sm font-medium text-foreground transition-all duration-300 hover:border-primary hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
