export type Config = {
  jobs: Job[];
};

export type Job = {
  repo: string;
  ref: string;
  workflow: string;
  cron: string;
  inputs?: Record<string, string>;
};
