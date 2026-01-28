import { Storage } from "@google-cloud/storage";
import path from "path";

// Inisialisasi Google Cloud Storage
const storage = new Storage({
    keyFilename: path.join(
        process.cwd(),
        "src",
        "utils",
        "config",
        "next-auth-tester-452115-c3833677c550.json"
    ),
});

export const bucketName = "swarnatactical"; // Ganti dengan nama bucket GCS kamu
const bucket = storage.bucket(bucketName);

export { bucket };
