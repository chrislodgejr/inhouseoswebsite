import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const requiredFiles = [
  "app/page.tsx",
  "app/admin/page.tsx",
  "app/layout.tsx",
  "app/api/inquiries/route.ts",
  "public/logo.png",
  "public/favicon.ico",
  "public/favicon-16x16.png",
  "public/favicon-32x32.png",
  "public/apple-touch-icon.png",
  "public/icon-192.png",
  "public/icon-512.png",
  "public/og-image.png",
  "public/site.webmanifest",
  "database/supabase-schema.sql",
];

for (const file of requiredFiles) {
  const full = path.join(root, file);
  if (!fs.existsSync(full)) throw new Error(`Missing required file: ${file}`);
}

const home = fs.readFileSync(path.join(root, "app/page.tsx"), "utf8");
const admin = fs.readFileSync(path.join(root, "app/admin/page.tsx"), "utf8");
const layout = fs.readFileSync(path.join(root, "app/layout.tsx"), "utf8");

const assertions = [
  [home.includes("Restaurant back office OS"), "Homepage must position InHouseOS as a restaurant back office OS."],
  [home.includes("AI owner briefs") || home.includes("AI owner brief"), "Homepage must mention AI owner briefs."],
  [home.includes("modulesButton"), "Modules nav button should use the formatted modulesButton class."],
  [home.includes("Launching Soon"), "Pricing must include Launching Soon."],
  [!home.includes("Samuels and Sons"), "Do not include screenshot restaurant/vendor names."],
  [!home.includes("Alfonso Librado Pacheco"), "Do not include screenshot employee names."],
  [admin.includes("/api/admin/login"), "Admin page must call login API."],
  [admin.includes("/api/inquiries"), "Admin page must call inquiries API."],
  [layout.includes("/favicon.ico") && layout.includes("/site.webmanifest"), "Favicons and manifest must be registered in metadata."],
];

for (const [ok, message] of assertions) {
  if (!ok) throw new Error(message);
}

console.log("Smoke tests passed.");
