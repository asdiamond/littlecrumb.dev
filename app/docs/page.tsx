import { Shell } from "../shell";

export default function Docs() {
  return (
    <Shell>
      <h1>Docs</h1>
      <p className="lede">
        Everything littlecrumb does, on one page. That&apos;s the point.
      </p>

      <h2>Install</h2>
      <pre>
        <code>{`bun add react react-dom littlecrumb
bunx littlecrumb dev`}</code>
      </pre>

      <h2>Pages</h2>
      <p>
        Every <code>page.tsx</code> under <code>app/</code> becomes a route.
        Directory names map to path segments:
      </p>
      <table>
        <thead>
          <tr>
            <th>File</th>
            <th>Route</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>app/page.tsx</code>
            </td>
            <td>
              <code>/</code>
            </td>
          </tr>
          <tr>
            <td>
              <code>app/about/page.tsx</code>
            </td>
            <td>
              <code>/about</code>
            </td>
          </tr>
          <tr>
            <td>
              <code>app/blog/[id]/page.tsx</code>
            </td>
            <td>
              <code>/blog/:id</code>
            </td>
          </tr>
          <tr>
            <td>
              <code>app/docs/[...slug]/page.tsx</code>
            </td>
            <td>
              <code>/docs/*</code>
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        Pages default-export a React component. Optional <code>loader</code>,{" "}
        <code>action</code>, and <code>ErrorBoundary</code> exports follow{" "}
        <a href="https://reactrouter.com/en/main/route/route">
          React Router&apos;s route module API
        </a>
        . Loaders run in the browser.
      </p>

      <h2>API routes</h2>
      <p>
        A <code>route.ts</code> exports one handler per HTTP method, served
        directly by <code>Bun.serve</code>:
      </p>
      <pre>
        <code>{`// app/api/users/[id]/route.ts  ->  /api/users/:id
export function GET(request: Bun.BunRequest<"/api/users/:id">) {
  return Response.json({ id: request.params.id });
}`}</code>
      </pre>
      <p>
        Supported methods: <code>GET</code>, <code>POST</code>,{" "}
        <code>PUT</code>, <code>PATCH</code>, <code>DELETE</code>,{" "}
        <code>HEAD</code>, <code>OPTIONS</code>. Unhandled methods return 405.
        A page and an API route mapping to the same path is a generate-time
        error.
      </p>

      <h2>Commands</h2>
      <table>
        <tbody>
          <tr>
            <td>
              <code>littlecrumb dev</code>
            </td>
            <td>Generate routes, start Bun with HMR</td>
          </tr>
          <tr>
            <td>
              <code>littlecrumb build</code>
            </td>
            <td>Production full-stack bundle in dist/</td>
          </tr>
          <tr>
            <td>
              <code>littlecrumb build --static</code>
            </td>
            <td>Pure static export for S3, R2, or any file host</td>
          </tr>
          <tr>
            <td>
              <code>littlecrumb start</code>
            </td>
            <td>Run the production server</td>
          </tr>
        </tbody>
      </table>

      <h2>Static exports</h2>
      <p>
        <code>build --static</code> bundles the client with absolute asset
        URLs, then writes a copy of the shell to every static route (
        <code>dist/docs/index.html</code>, …) plus a <code>404.html</code>, so
        deep links work on object-store hosts without rewrite rules. Dynamic
        routes are served by the 404 fallback. API routes require the server
        build and fail a static build loudly.
      </p>
      <p>
        This site is a littlecrumb static export hosted on Cloudflare — view
        source, it&apos;s just crumbs.
      </p>
    </Shell>
  );
}
