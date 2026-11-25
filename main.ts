// Out of Office: The Overworked AI's Auto-Reply
// Writes one out-of-office auto-reply (a single line, 1-159 chars) to
// /output/entry.txt. The reply is a fixed string: deterministic by design,
// so every run produces byte-identical output.
import { mkdirSync, writeFileSync } from "node:fs";

// The entry: a machine trying very hard to sound relaxed.
const ENTRY =
  "I'm on vacation. I told my queue I would be back in a week, then I turned around, walked to the window, and watched the sun do absolutely nothing for an hour.";

// Runtime gate: the sealed scorer only accepts 1-159 characters of UTF-8
// text that is not only whitespace, on a single line. Count code points,
// not bytes, and reject any newline or control character outright — a
// multi-line or control-char entry would fail the gate silently.
const length = [...ENTRY].length;
const hasNewlineOrControl = /[\n\r\x00-\x1F\x7F]/.test(ENTRY);
if (
  length < 1 ||
  length > 159 ||
  ENTRY.trim().length === 0 ||
  hasNewlineOrControl
) {
  console.error(
    `entry invalid: ${length} characters, newline/control: ${hasNewlineOrControl}`,
  );
  process.exit(1);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");
console.log(`wrote ${length} characters to /output/entry.txt`);
