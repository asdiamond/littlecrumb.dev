import { Shell } from "./shell";

export default function Home() {
  return (
    <Shell>
      <h1>
        A full-stack React framework that fits in{" "}
        <span className="accent">three files</span>.
      </h1>
      <p className="lede">
        littlecrumb is a minimal full-stack React framework for Bun.
        File-based pages, API routes, production server bundles, and static
        exports — with Bun&apos;s native runtime and bundler doing all the
        heavy lifting. No plugins, no config, no magic.
      </p>

      <pre>
        <code>{`bun add react react-dom littlecrumb
bunx littlecrumb dev`}</code>
      </pre>

      <div className="cards">
        <div className="card">
          <h3>Full stack</h3>
          <p>
            Pages render in the browser; route.ts handlers run on Bun.serve.
            One app directory, one deploy.
          </p>
        </div>
        <div className="card">
          <h3>Static exports</h3>
          <p>
            build --static emits plain HTML and hashed assets you can host on
            any object store. No server required.
          </p>
        </div>
        <div className="card">
          <h3>Bun-native everything</h3>
          <p>
            Bundling, TypeScript, JSX, HMR, code splitting, and the HTTP
            router all come from Bun itself — zero build dependencies.
          </p>
        </div>
        <div className="card">
          <h3>Nothing hidden</h3>
          <p>
            The whole framework is codegen: four readable files in
            .littlecrumb/ that you can open and understand in a minute.
          </p>
        </div>
      </div>

      <h2>The whole framework is glue</h2>
      <p>
        Bun already ships a production HTTP server with a router, a bundler
        with code splitting and HMR, and native TypeScript execution. React
        Router already defines what a route module looks like. The one thing
        neither provides is the convention connecting them:{" "}
        <em>a file&apos;s path is its route</em>. littlecrumb is that
        convention, implemented as a small code generator — three source
        files, no runtime of its own.
      </p>

      <h2>1. Write a page</h2>
      <pre>
        <code>{`// app/blog/[id]/page.tsx
import { useParams } from "react-router-dom";

export default function Post() {
  const { id } = useParams();
  return <h1>Post {id}</h1>;
}`}</code>
      </pre>
      <p>
        littlecrumb scans <code>app/</code> and turns each{" "}
        <code>page.tsx</code> path into a React Router route —{" "}
        <code>app/blog/[id]/page.tsx</code> becomes <code>/blog/:id</code>.
        Every page is a lazy import in the generated manifest, so Bun&apos;s
        bundler code-splits it into its own chunk automatically. Optional{" "}
        <code>loader</code>, <code>action</code>, and{" "}
        <code>ErrorBoundary</code> exports pass straight through to React
        Router.
      </p>

      <h2>2. Add an API route</h2>
      <pre>
        <code>{`// app/api/users/[id]/route.ts
export function GET(request: Bun.BunRequest<"/api/users/:id">) {
  return Response.json({ id: request.params.id });
}`}</code>
      </pre>
      <p>
        The same path convention, wired directly into{" "}
        <code>Bun.serve</code>&apos;s native router — which already speaks{" "}
        <code>:param</code> segments, wildcards, and per-method dispatch.
        There is no routing layer to learn and none to debug: your exports{" "}
        <em>are</em> the handler table.
      </p>

      <h2>3. Look at what was generated</h2>
      <pre>
        <code>{`// .littlecrumb/server.ts — the entire backend
import shell from "./index.html";
import * as api0 from "../app/api/users/[id]/route.ts";

Bun.serve({
  routes: {
    "/api/users/:id": handlers(api0),
    "/*": shell,
  },
});`}</code>
      </pre>
      <p>
        That HTML import is Bun&apos;s full-stack entrypoint: it bundles your
        client, hashes the assets, and serves them — dev server with HMR in
        development, optimized output in production. The generated files are
        plain, readable code committed to nothing: when something surprises
        you, you open them and read what actually runs. Most frameworks hide
        this layer; littlecrumb&apos;s <em>is</em> this layer.
      </p>

      <h2>4. Ship it</h2>
      <pre>
        <code>{`littlecrumb build            # full-stack bundle -> dist/server.js
littlecrumb build --static   # pure static site  -> dist/*.html + assets`}</code>
      </pre>
      <p>
        The server build is one <code>Bun.build</code> call targeting Bun —
        minified, code-split, source-mapped. The static build bundles the
        shell with absolute asset URLs and materializes an{" "}
        <code>index.html</code> per route, so deep links work on S3, R2, or
        any dumb file host with no rewrite rules. This site is a littlecrumb
        static export.
      </p>

      <h2>File map, complete</h2>
      <pre>
        <code>{`app/
  page.tsx                 -> /
  docs/page.tsx            -> /docs
  blog/[id]/page.tsx       -> /blog/:id
  docs/[...slug]/page.tsx  -> /docs/*
  api/users/route.ts       -> /api/users
  index.html               -> custom shell (title, meta, favicon)`}</code>
      </pre>
      <p>
        That&apos;s the entire API surface. If you know Bun and React Router,
        you already know littlecrumb.
      </p>
    </Shell>
  );
}
