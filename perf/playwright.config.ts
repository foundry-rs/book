import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  testMatch: '**/*.e2e.ts',
  outputDir: '../test-results/perf',
  workers: 1,
  use: { baseURL: 'http://127.0.0.1:5192', ...devices['Desktop Chrome'] },
  webServer: {
    command: 'vp dev --host 127.0.0.1 --port 5192 --strictPort',
    cwd: import.meta.dirname,
    env: { PERF_DEMO_DATA: '1' },
    url: 'http://127.0.0.1:5192/perf/solar/',
    reuseExistingServer: false,
  },
})
