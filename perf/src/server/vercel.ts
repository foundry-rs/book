import { createApi } from './api'
import { nodeHandler } from './http'
import { dispatchImport } from './workerDispatch'

export default nodeHandler(createApi({ importRun: dispatchImport }))
