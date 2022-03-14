import { Algodv2 } from 'algosdk'

import { Algodv2Params } from './algod-v2-params.interface'


export const AlgoSdkService: {client: Algodv2} = {
  client: null
}

export function setClient(algodv2Params: Algodv2Params) {
  AlgoSdkService.client = new Algodv2(
    algodv2Params.tokenOrBaseClient,
    algodv2Params.baseServer,
    algodv2Params.port,
    algodv2Params.headers
  )
}
