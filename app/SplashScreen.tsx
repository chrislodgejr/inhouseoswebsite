"use client";

import { useEffect, useState } from "react";

const DURATION_MS = 2700;

export default function SplashScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), DURATION_MS);
    return () => window.clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="splash-shell" role="status" aria-label="Loading InHouseOS">
      <div className="splash-grid" />
      <div className="splash-ring splash-ring-one" />
      <div className="splash-ring splash-ring-two" />
      <div className="splash-logo-wrap">
        <div className="splash-glow" />
        <img className="splash-logo" src="/logo.png" alt="InHouseOS" />
        <div className="splash-loader"><span /></div>
      </div>
      <div className="splash-scan" />
    </div>
  );
}
