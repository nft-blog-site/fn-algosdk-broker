// https://developer.algorand.org/docs/get-details/asa/

import { OptionalCommonFields } from "./optional-common-fields.interface"

export type AlgorandStandardAsset = Partial<OptionalCommonFields> 
  & AlgorandStandardAssetImmutable & AlgorandStandardAssetMutable

export interface AlgorandStandardAssetMutable {
  // The following parameters are the only ones
  // that can be changed, and they have to be changed
  // by the current manager
  // Specified address can change reserve, freeze, clawback, and manager
  manager: string
  // Specified address is considered the asset reserve
  // (it has no special privileges, this is only informational)
  reserve: string
  // Specified address can freeze or unfreeze user asset holdings 
  freeze: string
  // Specified address can revoke user asset holdings and send 
  // them to other addresses    
  clawback: string
}

export interface AlgorandStandardAssetImmutable {
  // The following parameters are asset specific
  // Throughout the example these will be re-used. 
  addr: string
  // Whether user accounts will need to be unfrozen before transacting    
  defaultFrozen: boolean
  // integer number of decimals for asset unit calculation
  decimals: 0 | number
  // total number of this asset available for circulation   
  totalIssuance: 1 | number
  // Used to display asset units to user    
  unitName?: string
  // Friendly name of the asset    
  assetName?: string
  // Optional string pointing to a URL relating to the asset
  assetURL?: string
  // Optional hash commitment of some sort relating to the asset. 32 character length.
  assetMetadataHash?: string
}
