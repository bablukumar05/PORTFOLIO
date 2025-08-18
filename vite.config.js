import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    base: "/My-Portofolio/", // must match EXACT repo name (case-sensitive)
});