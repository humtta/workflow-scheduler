type Config = {
  jobs: Job[];
};

type Job = {
  repo: string;
  ref: string;
  workflow: string;
  cron: string;
  inputs?: Record<string, string>;
};
