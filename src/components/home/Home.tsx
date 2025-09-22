import { useQuery } from "@tanstack/react-query";

interface GitHubRepo {
  name: string;
  description: string;
  stargazers_count: number;
  html_url: string;
}

export default function Home() {
  const { data, isLoading, error } = useQuery<GitHubRepo>({
    queryKey: ["demo", "repo"],
    queryFn: async () => {
      const response = await fetch("https://api.github.com/repos/TanStack/query");
      if (!response.ok) {
        throw new Error("Failed to fetch repository data");
      }
      return response.json();
    },
  });

  if (isLoading) {
    return <div>Loading repository data...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  return (
    <div>
      <h1>Welcome to the SPA Starter!</h1>
      <p>This app now includes TanStack Router and TanStack Query.</p>

      <div
        style={{
          marginTop: "2rem",
          padding: "1rem",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      >
        <h2>Demo: Repository Information</h2>
        <p>
          <strong>Name:</strong> {data.name}
        </p>
        <p>
          <strong>Description:</strong> {data.description}
        </p>
        <p>
          <strong>Stars:</strong> {data.stargazers_count}
        </p>
        <p>
          <a href={data.html_url} target="_blank" rel="noopener noreferrer">
            View on GitHub
          </a>
        </p>
      </div>
    </div>
  );
}
