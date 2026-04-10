import "dotenv/config";
import { config } from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.join(__dirname, "..", "..", ".env");
config({ path: envPath });

export { envPath };
