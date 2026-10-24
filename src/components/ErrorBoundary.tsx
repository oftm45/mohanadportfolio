import { Component, ErrorInfo, ReactNode } from "react";
import { Home, RotateCw } from "lucide-react";
import { ErrorScreen, errorGhostBtn, errorPrimaryBtn } from "@/components/ErrorScreen";

type Props = { children: ReactNode; resetKey?: string };
type State = { hasError: boolean };

/** Catches crashes anywhere in the pages and shows a themed error screen instead of a blank page. */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Page crashed:", error, info.componentStack);
  }

  componentDidUpdate(prev: Props) {
    // Navigating to another page clears the error.
    if (this.state.hasError && prev.resetKey !== this.props.resetKey) this.setState({ hasError: false });
  }

  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <ErrorScreen
        code="Oops"
        title="Something went wrong"
        description={<p>An unexpected error stopped this page from loading. Reloading usually fixes it.</p>}
        actions={
          <>
            <button type="button" onClick={() => window.location.reload()} className={errorPrimaryBtn}>
              <RotateCw className="h-4 w-4 transition-transform group-hover:rotate-90" />
              Reload page
            </button>
            <a href="/" className={errorGhostBtn}>
              <Home className="h-4 w-4" />
              Back to home
            </a>
          </>
        }
      />
    );
  }
}
