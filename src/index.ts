import { Hono } from "hono";
import { cors } from "hono/cors";
import { secureHeaders } from "hono/secure-headers";
import { timeout } from "hono/timeout";

import { respondStatus } from "./lib/respond";
import trailers from "./routes/trailers";

const app = new Hono();

app.use(secureHeaders({ crossOriginResourcePolicy: "cross-origin" }));
app.use(cors({ allowMethods: ["GET"] }));
app.use(timeout(10000));

app.get("/", (c) => respondStatus(c, 200));
app.route("/", trailers);

app.notFound((c) => respondStatus(c, 404));
app.onError((_, c) => respondStatus(c, 500));

export default app;
