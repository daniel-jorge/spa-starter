import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ErrorBoundary } from ".";

const Bomb = () => {
  throw new Error("boom");
};

describe("ErrorBoundary", () => {
  beforeEach(() => {
    // silence expected React error logs during tests
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("renders children when no error is thrown", () => {
    render(
      <ErrorBoundary>
        <div>all good</div>
      </ErrorBoundary>,
    );

    expect(screen.getByText("all good")).toBeTruthy();
  });

  it("shows default fallback UI when a child throws", () => {
    render(
      <ErrorBoundary>
        <Bomb />
      </ErrorBoundary>,
    );

    expect(screen.getByRole("heading").textContent).toMatch(/Something went wrong/i);
    expect(screen.getByText(/boom/)).toBeTruthy();
    expect(console.error).toHaveBeenCalled();
  });

  it("uses the provided renderError prop when present", () => {
    const renderError = (error: Error) => <div>custom {error.message}</div>;

    render(
      <ErrorBoundary renderError={renderError}>
        <Bomb />
      </ErrorBoundary>,
    );

    expect(screen.getByText("custom boom")).toBeTruthy();
  });
});
