import { Component, type ErrorInfo, type ReactNode } from 'react';

interface AppErrorBoundaryProps {
  children: ReactNode;
}

interface AppErrorBoundaryState {
  error: Error | null;
}

export class AppErrorBoundary extends Component<AppErrorBoundaryProps, AppErrorBoundaryState> {
  state: AppErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): AppErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Movie Journal no pudo renderizarse.', error, errorInfo);
  }

  render() {
    if (this.state.error) {
      return (
        <main className="error-screen" role="alert">
          <small>Error de renderizado</small>
          <h1>Movie Journal no pudo iniciar</h1>
          <p>{this.state.error.message}</p>
          <p>Revisa la consola del navegador para ver el stack trace completo.</p>
        </main>
      );
    }

    return this.props.children;
  }
}
