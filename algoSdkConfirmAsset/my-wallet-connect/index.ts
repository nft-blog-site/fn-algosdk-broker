import {SignatureHandlerKeys} from "~algoSdkMakeAsset/signature-handler.enum"

import {MY_WALLET_CONNECT_METHOD} from "./constants"
import {effector} from "./my-wallet-connect"


export const conditional = ({key, value}) => 
  key.toLowerCase() === SignatureHandlerKeys.method 
  && value.toLowerCase() === MY_WALLET_CONNECT_METHOD

export const myWalletSideEffect = {conditional, effector}
