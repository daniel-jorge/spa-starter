import { render, screen } from "@testing-library/react";
import type React from "react";

import App from "./app";

describe("App", () => {
  it("renders the Hello, world! message inside Suspense", () => {
    render(<App />);

    // The App by default renders Hello, world! so ensure it's present.
    expect(screen.getByText("Hello, world!")).toBeInTheDocument();
  });

  it("shows Suspense fallback when a child suspends", () => {
    function LazySimulator(): React.ReactElement {
      throw new Promise(() => {});
    }

    render(
      <App>
        <LazySimulator />
      </App>,
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
