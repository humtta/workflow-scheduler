import { Job } from "./config.ts";

const githubApiBase = "https://api.github.com";
const githubApiVersion = "2026-03-10";

export async function dispatchWorkflow(job: Job, token: string): Promise<void> {
  const response = await fetch(buildDispatchUrl(job.repo, job.workflow), {
    method: "POST",
    headers: buildHeaders(token),
    body: JSON.stringify({ ref: job.ref, inputs: job.inputs }),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(
      `Failed to dispatch ${job.repo}/${job.workflow}: ${details}`,
    );
  }

  await response.body?.cancel();
}

/**
 * Builds the GitHub API URL used to trigger a workflow_dispatch event.
 */
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
