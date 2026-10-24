import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, Home } from "lucide-react";
import { ErrorScreen, errorGhostBtn, errorPrimaryBtn } from "@/components/ErrorScreen";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Page not found | Mohanad Abubaker";
    const robots = document.createElement("meta");
    robots.name = "robots";
    robots.content = "noindex";
    document.head.appendChild(robots);
    return () => {
      robots.remove();
      document.title = "Mohanad Abubaker - Personal Portfolio";
    };
  }, []);

  return (
    <ErrorScreen
      code="404"
      title="Page not found"
      description={
        <>
          <p>This page doesn't exist or has moved.</p>
          <p className="mt-2 break-all font-mono text-xs text-muted-foreground/70">{location.pathname}</p>
        </>
      }
      actions={
        <>
          <Link to="/" className={errorPrimaryBtn}>
            <Home className="h-4 w-4" />
            Back to home
          </Link>
          <button type="button" onClick={() => navigate(-1)} className={errorGhostBtn}>
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Go back
          </button>
        </>
      }
    />
  );
};

export default NotFound;
