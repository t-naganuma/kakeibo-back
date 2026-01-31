/**
 * Lambda Handler
 *
 * AWS Lambda用エントリーポイント
 */

import { handle } from "hono/aws-lambda";
import app from "../src/api";

export const handler = handle(app);
