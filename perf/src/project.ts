import { projectFromBase } from './projects'

// Server modules share some browser helpers; outside a Vite build there is no base path.
export const project = projectFromBase(import.meta.env?.BASE_URL ?? '/')
