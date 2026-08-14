# jav-pack-api

> 一点微小的工作

```sh
pnpm i
pnpm dev
```

```sh
pnpm run deploy
```

[For generating/synchronizing types based on your Worker configuration run](https://developers.cloudflare.com/workers/wrangler/commands/#types):

```sh
pnpm types
```

Pass the `CloudflareBindings` as generics when instantiation `Hono`:

```ts
const app = new Hono<{ Bindings: CloudflareBindings }>();
```
