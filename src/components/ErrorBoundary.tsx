import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-right" dir="rtl">
          <div className="max-w-md w-full bg-white rounded-2xl p-8 border border-slate-200 shadow-lg">
            <h2 className="text-xl font-bold text-slate-900 mb-2 font-display">
              حدث خطأ أثناء تحميل الصفحة
            </h2>
            <p className="text-xs text-slate-600 mb-6 leading-relaxed">
              يرجى تحديث الصفحة أو الضغط على الزر أدناه لإعادة المحاولة.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="w-full py-2.5 px-4 bg-cyan-700 text-white text-xs font-bold rounded-xl hover:bg-cyan-800 transition-colors"
            >
              إعادة تحميل الصفحة
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
