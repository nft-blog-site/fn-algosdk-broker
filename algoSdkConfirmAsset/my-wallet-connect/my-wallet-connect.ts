import {Context, HttpRequest} from "@azure/functions"
import {waitForConfirmation} from "algosdk"
import HTTP_STATUS_CODES from "http-status-enum"

import {factoryRequestResolver} from "~src/utilities/request-resolver.factory"
import {AlgoSdkService} from "~src/services/algoSdk.service"
import { 
  invalidRequestPayloadError 
} from "~src/errors/invalid-request-payload.error"
import {DEFAULT_MAX_ROUNDS_TO_WAIT_FOR_TX_CONFIRMATION} from "./constants"
import {validateRequest} from "./validate-request"


export const effector = async (context : Context, req : HttpRequest) => {
  const resolveTransaction = factoryRequestResolver(context.res)

  const invalidRequest = validateRequest(req)
  if (invalidRequest) {
    context.log.error('error', invalidRequest)
    resolveTransaction(invalidRequestPayloadError(invalidRequest))
    return
  }

  try {
    const txnSignedByTheUser = {
      txID: req.body.txn.txID,
      blob: new Uint8Array(req.body.txn.blob)
    }
    
    const confirmedTxn = await waitForConfirmation(AlgoSdkService.client, 
        txnSignedByTheUser.txID, DEFAULT_MAX_ROUNDS_TO_WAIT_FOR_TX_CONFIRMATION)

    context.log(
      "[algoSdkMakeAsset::my-wallet-connect] Transaction = %s, for asset %s confirmed in round %s", 
      txnSignedByTheUser.txID, req.body.assetURL, 
      confirmedTxn["confirmed-round"])
  
    // Get the completed Transaction
    const assetId = confirmedTxn["asset-index"]
    const accountInfo = await AlgoSdkService.client
      .accountInformation(req.body.account).do()
    const assetParams = accountInfo['created-assets']
      .find(asset => asset.index === assetId)
      .params
    const assetHolding = accountInfo['assets']
      .find(asset => asset['asset-id'] === assetId)

    resolveTransaction({
      body: {
        txID: txnSignedByTheUser.txID,
        assetId, 
        assetParams, 
        assetHolding
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
