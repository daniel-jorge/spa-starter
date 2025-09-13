import type { ReactNode } from "react";
import { Component } from "react";

type ErrorBoundaryProps = {
  children: ReactNode;
  renderError?: (error: Error) => ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error?: Error;
};

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: undefined };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error("ErrorBoundary caught an error", error, errorInfo);
    this.setState({ error });
  }

  render() {
    if (this.state.hasError) {
      const error = this.state.error || new Error("An unknown error occurred");
      if (this.props.renderError) {
        return this.props.renderError(error);
      }

      return (
        <div>
          <h1>Something went wrong.</h1>
          <p>{error.message}</p>
        </div>
      );
    }

    return this.props.children;
  }
}
