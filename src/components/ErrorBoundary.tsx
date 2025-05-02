
import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }
  
  public resetError = () => {
    this.setState({ hasError: false, error: null });
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      return (
        <div className="flex flex-col items-center justify-center p-6 m-4 rounded-lg border border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800/30">
          <AlertTriangle className="h-10 w-10 text-red-500 mb-4" />
          <h2 className="text-xl font-semibold text-red-700 dark:text-red-300 mb-2">Something went wrong</h2>
          <p className="text-sm text-red-600 dark:text-red-200 mb-4">
            {this.state.error?.message || "An unexpected error occurred"}
          </p>
          <Button 
            variant="outline" 
            onClick={this.resetError}
            className="border-red-200 hover:bg-red-100 dark:border-red-800 dark:hover:bg-red-900/40"
          >
            Try Again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
