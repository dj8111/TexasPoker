import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// When deploying to GitHub Pages, GITHUB_REPOSITORY is automatically set by Actions (e.g. "user/repo-name").
// We extract the repo name to use as the base path, since GitHub Pages serves from a subpath.
// Locally, we fall back to './' so dev server works without any env setup.
const getBase = (): string => {
  const repo = process.env.GITHUB_REPOSITORY;
  if (repo) {
    const repoName = repo.split('/')[1];
    return `/${repoName}/`;
  }
  return './';
};

export default defineConfig({
  plugins: [react()],
  base: getBase(),
  server: {
    port: 5173,
    open: false
  },
  preview: {
    port: 4173,
    open: false
  }
})
