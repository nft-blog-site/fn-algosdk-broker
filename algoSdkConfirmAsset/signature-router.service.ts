import { SignatureHandlerKeys } from './signature-handler.enum'
import { myWalletSideEffect } from './my-wallet-connect'
import type { SideEffect } from '~src/utilities/side-effect.interface'


const keyHandlerSideEffects: SideEffect[] = [ myWalletSideEffect ]

export const SignatureRouterService = {
  route: (method) => {
    const key = String(SignatureHandlerKeys.method)
    const value = method

    const fn = keyHandlerSideEffects
      .find(effector => effector.conditional({key, value})) ?. effector
    
    return fn
  }
}
