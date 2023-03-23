"use strict";

const path = require("path");
const pathToHooks = path.join(process.cwd(), "test", "setup", "hook.js");

module.exports = {
  // spec: "test/**/*.test.js",
  require: pathToHooks,
  // file: [pathToHooks],
  recursive: true,
  reporter: "spec",
  parallel: false,
  ignore: ["/path/to/some/ignored/file"],
  extension: ["js", "cjs", "mjs"],
  color: true,
  diff: true,
};
