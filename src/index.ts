import { Hono } from "hono";

import trailers from "./routes/trailers";

const app = new Hono();

app.get("/", (c) => c.text("Hello, World!"));
app.route("/trailers", trailers);

app.notFound((c) => c.json({ error: "Not Found" }, 404));
app.onError((_, c) => c.json({ error: "Internal Server Error" }, 500));

export default app;
