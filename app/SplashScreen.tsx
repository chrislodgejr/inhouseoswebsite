"use client";

import { useEffect, useState } from "react";

const DURATION_MS = 5200;

export default function SplashScreen() {
  const [visible, setVisible] = useState(true);
  const [src, setSrc] = useState("/logo.png");

  useEffect(() => {
    let active = true;
    const image = new Image();

    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;

      ctx.drawImage(image, 0, 0);
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = data.data;
      const sample = (x: number, y: number) => {
        const i = (y * canvas.width + x) * 4;
        return [pixels[i], pixels[i + 1], pixels[i + 2]];
      };
      const corners = [sample(0, 0), sample(canvas.width - 1, 0), sample(0, canvas.height - 1), sample(canvas.width - 1, canvas.height - 1)];
      const bg = corners.reduce((acc, color) => [acc[0] + color[0] / 4, acc[1] + color[1] / 4, acc[2] + color[2] / 4], [0, 0, 0]);

      for (let i = 0; i < pixels.length; i += 4) {
        const dr = pixels[i] - bg[0];
        const dg = pixels[i + 1] - bg[1];
        const db = pixels[i + 2] - bg[2];
        const distance = Math.sqrt(dr * dr + dg * dg + db * db);
        const brightness = Math.max(pixels[i], pixels[i + 1], pixels[i + 2]);
        if (distance < 46 || brightness < 34) pixels[i + 3] = 0;
      }

      ctx.putImageData(data, 0, 0);
      if (active) setSrc(canvas.toDataURL("image/png"));
    };

    image.src = "/logo.png";
    const timer = window.setTimeout(() => setVisible(false), DURATION_MS);

    return () => {
      active = false;
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
        <img className="splash-logo" src={src} alt="InHouseOS" />
        <div className="splash-loader"><span /></div>
      </div>
      <div className="splash-scan" />
    </div>
  );
}
