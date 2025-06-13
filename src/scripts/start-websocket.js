// Change the import to point to the .ts file and use tsx
import { spawn } from "child_process";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Run the TypeScript file directly with tsx
const tsFile = join(__dirname, "../server/websocket/live-analysis-server.ts");

const child = spawn("npx", ["tsx", tsFile], {
  stdio: "inherit",
  shell: true,
});

child.on("error", (error) => {
  console.error("Failed to start WebSocket server:", error);
});

child.on("exit", (code) => {
  console.log(`WebSocket server exited with code ${code}`);
});

console.log("🚀 Starting WebSocket server with TypeScript...");
