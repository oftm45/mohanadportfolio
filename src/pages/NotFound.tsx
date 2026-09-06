import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const NotFound = () => {
  const location = useLocation();
  const { t, language } = useLanguage();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div className="w-[42rem] h-[42rem] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      {/* Subtle grid backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 60% 50% at 50% 50%, black 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 60% 50% at 50% 50%, black 30%, transparent 100%)",
        }}
      />

      <div className="relative z-10 px-6 text-center animate-fade-in">
        {/* Giant 404 */}
        <h1 className="font-display text-[26vw] sm:text-[12rem] leading-none select-none bg-gradient-to-b from-foreground via-foreground/70 to-foreground/10 bg-clip-text text-transparent tracking-tight">
          {t("notFoundCode")}
        </h1>

        <div className="mx-auto mt-2 mb-6 h-px w-24 bg-gradient-to-r from-transparent via-foreground/40 to-transparent" />

        <h2 className="font-display text-3xl sm:text-4xl text-foreground mb-3">
          {t("notFoundTitle")}
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto mb-10 leading-relaxed">
          {t("notFoundDesc")}
        </p>

        <Link
          to="/"
          className="group inline-flex items-center gap-2.5 rounded-full border border-border bg-card/80 px-8 py-3.5 text-sm font-medium text-foreground backdrop-blur-sm transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:border-primary hover:shadow-[0_10px_30px_-10px_hsl(0_0%_100%/0.25)]"
        >
          {language === "ar" ? (
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
          ) : (
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
          )}
          <span>{t("notFoundCta")}</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
