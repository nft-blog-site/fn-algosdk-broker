import { Context, HttpRequest } from '@azure/functions'
import { invalidRequestPayloadError } from '~src/errors/invalid-request-payload.error'

import { factoryHttpTrigger } from '~src/utilities/http-trigger.factory'
import { factoryRequestResolver } from '~src/utilities/request-resolver.factory'
import { config } from './config'
import { SignatureRouterService } from './signature-router.service'

const algoSdkMadeAssetTrigger = async (context : Context, req : HttpRequest) => {
  const resolveTransaction = factoryRequestResolver(context.res)

  const methodHandler = SignatureRouterService.route(context.bindingData.method)

  if (! methodHandler) {
    const message = `[${config.fnName}] no route configured for '${context.bindingData.method}'`
    context.log.error('error', invalidRequestPayloadError({message}))
    resolveTransaction(invalidRequestPayloadError({message}))
    return
  } 

  await methodHandler(context, req)
}

export default factoryHttpTrigger({
  functionName: config.fnName, 
  fn: algoSdkMadeAssetTrigger
})
