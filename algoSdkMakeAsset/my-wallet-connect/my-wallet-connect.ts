import { Context, HttpRequest } from "@azure/functions"
import { makeAssetCreateTxnWithSuggestedParamsFromObject } from "algosdk"
import HTTP_STATUS_CODES from "http-status-enum"

import { factoryRequestResolver } from "~src/utilities/request-resolver.factory"
import { 
  invalidRequestPayloadError 
} from "~src/errors/invalid-request-payload.error"
import { 
  AssetFormatterService 
} from "~src/services/asset-formatter/asset-formatter.service"
import { validateRequest } from "./validate-request"


export const effector = async (context : Context, req : HttpRequest) => {
  const resolveTransaction = factoryRequestResolver(context.res)

  const invalidRequest = validateRequest(req)
  if (invalidRequest) {
    context.log.error('error', invalidRequest)
    resolveTransaction(invalidRequestPayloadError(invalidRequest))
    return
  }

  try {
    const argumentFormatter = AssetFormatterService
      .getAssetFormatter(req.body.asa_type)
    const asaArguments = argumentFormatter.format(req.body)

    context.log('asaArguments', asaArguments)

    const txn = 
      await makeAssetCreateTxnWithSuggestedParamsFromObject(asaArguments)

    resolveTransaction({
      body: {
        key: req.body.filename + req.body.signature,
        txn
      },
      status: HTTP_STATUS_CODES.OK
    })
  } catch (err) {
    context.log.error('500 error', err.message, err.stack)
    resolveTransaction({
      status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
      body: {
        status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        message: String(err.message)
      }
    })
  }
}
