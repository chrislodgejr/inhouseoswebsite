"use client";

import { useEffect, useState } from "react";

const DURATION_MS = 2700;

async function prepareLogo(src: string) {
  return new Promise<string>((resolve) => {
    const img = new Image();
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) return resolve(src);
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const max = Math.max(r, g, b);
          const min = Math.min(r, g, b);
          const blueNavy = b >= r && b >= g && max < 84 && max - min < 58;
          if (max < 38 || blueNavy) data[i + 3] = 0;
        }
        ctx.putImageData(imageData, 0, 0);
        resolve(canvas.toDataURL("image/png"));
      } catch {
        resolve(src);
      }
    };
    img.onerror = () => resolve(src);
    img.src = src;
  });
}

export default function SplashScreen() {
  const [visible, setVisible] = useState(true);
  const [logo, setLogo] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    prepareLogo("/logo.png").then((result) => {
      if (mounted) setLogo(result);
    });
    const timer = window.setTimeout(() => setVisible(false), DURATION_MS);
    return () => {
      mounted = false;
      window.clearTimeout(timer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="splash-shell" role="status" aria-label="Loading InHouseOS">
      <div className="splash-grid" />
      <div className="splash-ring splash-ring-one" />
      <div className="splash-ring splash-ring-two" />
      <div className="splash-logo-wrap">
        <div className="splash-glow" />
        {logo ? <img className="splash-logo" src={logo} alt="InHouseOS" /> : <div className="splash-logo-placeholder" />}
        <div className="splash-loader"><span /></div>
      </div>
      <div className="splash-scan" />
    </div>
  );
}
