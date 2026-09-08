const githubApiBase = "https://api.github.com";

function buildDispatchUrl(repo: string, workflow: string): string {
  const encodedRepo = repo.split("/").map(encodeURIComponent).join("/");
  const encodedWorkflow = encodeURIComponent(workflow);

  return `${githubApiBase}/repos/${encodedRepo}/actions/workflows/${encodedWorkflow}/dispatches`;
}
