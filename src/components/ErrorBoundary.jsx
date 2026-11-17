import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-[400px] rounded-3xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-3">
            ⚠️
          </div>
          <h3 className="text-base font-bold text-navy mb-1">Interactive Simulation Fallback</h3>
          <p className="text-xs text-resqtext-secondary max-w-sm mb-4">
            The 3D canvas encountered a hardware rendering warning. Telemetry and mission controls remain fully active.
          </p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="px-4 py-2 rounded-xl bg-resqblue text-white text-xs font-bold shadow hover:bg-resqblue-hover"
          >
            Retry 3D Stage
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

