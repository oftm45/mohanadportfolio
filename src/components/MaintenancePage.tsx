import { Linkedin, Instagram, Mail, ExternalLink, Wrench } from "lucide-react";
import { Logo } from "@/components/Logo";

const links = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/mohanadabubakerabdallh/", icon: Linkedin },
  { label: "Instagram", href: "https://www.instagram.com/mo_n5d", icon: Instagram },
  { label: "ICSC Ambassador", href: "https://icscompetition.org/en/mabubaker", icon: ExternalLink },
  { label: "Email", href: "mailto:MohanadAbubaker5@gmail.com", icon: Mail },
];

/** Shown to public visitors while the site is under maintenance. */
const MaintenancePage = () => (
  <main className="relative min-h-screen flex items-center justify-center px-6 py-16">
    <div className="relative z-10 w-full max-w-xl text-center animate-fade-in-up">
      <Logo className="mx-auto h-14 w-auto mb-10" />

      <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-card/70 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-muted-foreground backdrop-blur-sm">
        <Wrench className="h-3.5 w-3.5 text-primary" />
        Under maintenance
      </div>

      <h1 className="font-display text-5xl sm:text-7xl leading-[1.05] text-foreground mb-5">
        Let him <span className="italic text-primary">cook</span>
      </h1>

      <div className="mx-auto mb-6 h-px w-24 bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

      <p className="text-muted-foreground max-w-md mx-auto mb-10 leading-relaxed">
        The site is currently under maintenance. I'm working on something new — check back soon.
        In the meantime, you can find me here:
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {links.map(({ label, href, icon: Icon }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("mailto:") ? undefined : "_blank"}
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2.5 rounded-full border border-border bg-card/80 px-6 py-3 text-sm font-medium text-foreground backdrop-blur-sm transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:border-primary"
          >
            <Icon className="h-4 w-4" />
            {label}
          </a>
        ))}
      </div>

      <p className="mt-12 text-xs text-muted-foreground/70">© {new Date().getFullYear()} Mohanad Abubaker Osman</p>
    </div>
  </main>
);

export default MaintenancePage;
