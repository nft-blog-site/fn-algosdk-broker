import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { setLogger } from "~src/services/log.service"


export interface HttpTrigerOptions {
  functionName: string, 
  fn: (context: Context, req: HttpRequest) => void
}

export const factoryHttpTrigger = 
    ({functionName, fn}: HttpTrigerOptions) : AzureFunction => {
  return async function(context: Context, req: HttpRequest) {
    setLogger(context.log)
  
    context.log(`[${functionName}] HTTP trigger function processed a request.`)
  
    await fn(context, req)

    context.done()
  }
}
