import type { 
  AssetCreateTxn, MustHaveSuggestedParams 
} from "algosdk/dist/types/src/types"
import type { 
  Expand, RenameProperties 
} from "algosdk/dist/types/src/types/utils"

export interface ASATargetProperties {
  reKeyTo: 'rekeyTo'
  assetTotal: 'total'
  assetDecimals: 'decimals'
  assetDefaultFrozen: 'defaultFrozen'
  assetManager: 'manager'
  assetReserve: 'reserve'
  assetFreeze: 'freeze'
  assetClawback: 'clawback'
  assetUnitName: 'unitName'
}

export type MakeAssetCreateTxnStaticProperties = 'from' | 'note' | 'total' 
  | 'decimals' | 'defaultFrozen' | 'manager' | 'reserve' | 'freeze' 
  | 'clawback' | 'unitName' | 'assetName' | 'assetURL' | 'assetMetadataHash' 
  | 'suggestedParams' | 'rekeyTo'

export type MakeAssetCreateTxnWithSuggestedParamsFromObjectProperties = 
  Expand<Pick<RenameProperties<MustHaveSuggestedParams<AssetCreateTxn>, 
ASATargetProperties>, MakeAssetCreateTxnStaticProperties>> 
