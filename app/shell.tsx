import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import "./site.css";

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="wrap">
      <nav>
        <Link className="brand" to="/">
          🍞 littlecrumb
        </Link>
        <Link to="/docs">docs</Link>
        <a href="https://github.com/asdiamond/littlecrumb">github</a>
        <a href="https://www.npmjs.com/package/littlecrumb">npm</a>
      </nav>
      <main>{children}</main>
      <footer>
        MIT licensed. Built with littlecrumb, naturally —{" "}
        <a href="https://github.com/asdiamond/littlecrumb">source</a>.
      </footer>
    </div>
  );
}
