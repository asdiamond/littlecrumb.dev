import { Shell } from "./shell";

export default function Home() {
  return (
    <Shell>
      <h1>
        A React framework that fits in{" "}
        <span className="accent">three files</span>.
      </h1>
      <p className="lede">
        littlecrumb is a minimal, client-rendered React framework for Bun.
        File-based routing, API routes, and production builds — powered
        entirely by Bun&apos;s native server and bundler with React Router.
        No plugins, no config, no magic.
      </p>

      <pre>
        <code>{`bun add react react-dom littlecrumb
bunx littlecrumb dev`}</code>
      </pre>

      <div className="cards">
        <div className="card">
          <h3>File-based routing</h3>
          <p>
            app/blog/[id]/page.tsx becomes /blog/:id. Dynamic segments and
            catch-alls included.
          </p>
        </div>
        <div className="card">
          <h3>API routes</h3>
          <p>
            route.ts exports GET, POST and friends, served directly by
            Bun.serve&apos;s native router.
          </p>
        </div>
        <div className="card">
          <h3>Static exports</h3>
          <p>
            build --static emits plain HTML and hashed assets you can host on
            any object store.
          </p>
        </div>
        <div className="card">
          <h3>Nothing hidden</h3>
          <p>
            The whole framework is codegen: four readable files in
            .littlecrumb/ that you can open and understand.
          </p>
        </div>
      </div>

      <h2>How it works</h2>
      <p>
        <code>littlecrumb dev</code> scans your <code>app/</code> directory,
        generates a route manifest, and hands everything to Bun — HMR,
        bundling, and TypeScript come from the runtime, not from us. Pages
        default-export a React component; optional <code>loader</code>,{" "}
        <code>action</code>, and <code>ErrorBoundary</code> exports follow
        React Router&apos;s route module API.
      </p>
      <pre>
        <code>{`app/
  page.tsx                 -> /
  docs/page.tsx            -> /docs
  blog/[id]/page.tsx       -> /blog/:id
  api/users/route.ts       -> /api/users`}</code>
      </pre>
    </Shell>
  );
}
