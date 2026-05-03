import { Hono } from "hono";

import { getTrailer as getAVWikiDBTrailer } from "./services/av-wiki-db";
import { getTrailer as getJAVDatabaseTrailer } from "./services/jav-database";
import { codeValidator } from "./validators/code";

const app = new Hono<{ Bindings: CloudflareBindings }>();

app.get("/", (c) => c.text("Hello, World!"));

app.get("/trailers/:code", codeValidator("param", "code"), (c) => {
  const { code } = c.req.valid("param");

  return Promise.any([getAVWikiDBTrailer(code), getJAVDatabaseTrailer(code)])
    .then((res) => c.json(res))
    .catch(() => c.notFound());
});

app.notFound((c) => c.json({ error: "Not Found" }, 404));

app.onError((_, c) => c.json({ error: "Internal Server Error" }, 500));

export default app;
