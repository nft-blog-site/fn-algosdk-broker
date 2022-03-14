import {SignatureHandlerKeys} from "~algoSdkMakeAsset/signature-handler.enum"

import {PAGO_WALLET_METHOD} from "./constants"
import {effector} from "./pago-wallet"


export const conditional = ({key, value}) => 
  key.toLowerCase() === SignatureHandlerKeys.method 
  && value.toLowerCase() === PAGO_WALLET_METHOD

export const pageWalletSideEffect = {conditional, effector}
