import multer from "multer";
import fs from "fs";
import path from "path";
import { randomUUID } from "crypto";

// Resolve this once so uploads do not depend on the directory that started Node.
const tempDirectory = path.resolve(process.cwd(), "public", "temp");
fs.mkdirSync(tempDirectory, { recursive: true });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, tempDirectory);
  },
  filename: function (req, file, cb) {
    // Preserve the extension while preventing two simultaneous uploads from
    // overwriting each other (and avoid trusting a client-provided filename).
    cb(null, `${randomUUID()}${path.extname(file.originalname)}`);
  },
});

export const upload = multer({
  storage,
});
