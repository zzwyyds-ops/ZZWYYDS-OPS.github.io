import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

function getBasePath() {
  const repository = process.env.GITHUB_REPOSITORY?.split("/")[1];
  const userSiteRepo = "ZZWYYDS-OPS.github.io";

  if (!repository || repository === userSiteRepo) {
    return "/";
  }

  return `/${repository}/`;
}

export default defineConfig({
  base: getBasePath(),
  plugins: [react()],
});
