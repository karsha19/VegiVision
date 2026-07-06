import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('App crashed:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ textAlign: 'center', padding: '80px 20px' }}>
          <h2>Something went wrong 😕</h2>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: 20 }}>
            Please refresh the page and try again.
          </p>
          <button className="btn btn-primary" onClick={() => window.location.reload()}>
            Reload App
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
