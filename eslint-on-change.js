// eslint-on-change.js
import { exec } from "child_process";
import path from "path";

import nodemon from "nodemon";

nodemon({
  watch: ["src"],
  ext: "js,jsx,ts,tsx",
  ignore: ["dist", "node_modules"],
  quiet: true,
  delay: "2000",
  exec: '"',
});

nodemon.on("restart", (files) => {
  if (files && files.length > 0) {
    // Get the first changed file
    const changedFile = files[0];
    const absolutePath = path.resolve(changedFile);
    //console.log("File changed:", absolutePath);
    exec(`npx eslint --fix "${absolutePath}"`, (err, stdout, stderr) => {
      if (stdout) console.log("ESLint output:", stdout);
      if (stderr) console.error("ESLint error:", stderr);

      if (err) {
        console.error("ESLint failed:", err.message);
        return;
      }

      exec(`npx eslint src`, (_, fullStdout) => {
        if (fullStdout.trim()) {
          console.log("\n📋 Remaining lint issues:\n" + fullStdout);
        } else {
          console.log("🎉 No lint issues remaining!");
        }
      });
    });
  }
});

nodemon.on("start", () => {});

nodemon.on("quit", () => {
  console.log("File watcher stopped");
  // eslint-disable-next-line no-undef
  process.exit();
});
