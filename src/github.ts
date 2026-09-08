const githubApiBase = "https://api.github.com";
const githubApiVersion = "2026-03-10";

function buildDispatchUrl(repo: string, workflow: string): string {
  const encodedRepo = repo.split("/").map(encodeURIComponent).join("/");
  const encodedWorkflow = encodeURIComponent(workflow);

  return `${githubApiBase}/repos/${encodedRepo}/actions/workflows/${encodedWorkflow}/dispatches`;
}

function buildHeaders(token: string): HeadersInit {
  return {
    "Accept": "application/vnd.github+json",
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json",
    "X-GitHub-Api-Version": githubApiVersion,
  };
}
