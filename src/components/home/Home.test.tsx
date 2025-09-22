import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Home from "./Home";

// Mock the GitHub API response
const mockRepoData = {
  name: "query",
  description:
    "🤖 Powerful asynchronous state management for TS/JS, React, Solid, Vue, Svelte and Angular",
  stargazers_count: 40000,
  html_url: "https://github.com/TanStack/query",
};

describe("Home", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    // Create a new QueryClient for each test
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false, // Disable retries for tests
        },
      },
    });

    // Mock fetch globally
    vi.stubGlobal("fetch", vi.fn());
  });

  it("renders loading state initially", () => {
    // Mock fetch to return a pending promise
    const mockFetch = vi.mocked(fetch);
    mockFetch.mockImplementation(() => new Promise(() => {})); // Never resolves

    render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>,
    );

    expect(screen.getByText("Loading repository data...")).toBeInTheDocument();
  });

  it("renders repository data when fetch succeeds", async () => {
    // Mock successful fetch
    const mockFetch = vi.mocked(fetch);
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockRepoData,
    } as Response);

    render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>,
    );

    // Wait for the data to load
    await waitFor(() => {
      expect(screen.getByText("Welcome to the SPA Starter!")).toBeInTheDocument();
    });

    // Check that the repository data is displayed
    expect(screen.getByText("query")).toBeInTheDocument();
    expect(screen.getByText(mockRepoData.description)).toBeInTheDocument();
    expect(screen.getByText("40000")).toBeInTheDocument();
    expect(screen.getByText("View on GitHub")).toBeInTheDocument();
  });

  it("renders error state when fetch fails", async () => {
    // Mock failed fetch
    const mockFetch = vi.mocked(fetch);
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
    } as Response);

    render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>,
    );

    // Wait for the error state
    await waitFor(() => {
      expect(screen.getByText(/Error:/)).toBeInTheDocument();
    });

    expect(screen.getByText("Error: Failed to fetch repository data")).toBeInTheDocument();
  });
});
