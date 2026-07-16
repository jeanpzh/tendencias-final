import sharp from "sharp";
import { readFileSync } from "fs";
import { join } from "path";

const svgBuffer = readFileSync(join(process.cwd(), "public", "og.svg"));

sharp(svgBuffer)
  .resize(1200, 630)
  .png()
  .toFile(join(process.cwd(), "public", "og.png"))
  .then(() => console.log("OG image generated"))
  .catch((err) => console.error(err));