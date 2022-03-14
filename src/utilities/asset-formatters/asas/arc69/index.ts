import { propertiesOf } from "ts-reflection"

import { Collection } from "~src/utilities/collection"
import { 
  AlgorandStandardAsset 
} from "~src/utilities/asset-formatters/asas/algorand-standard-asset.interface"
import { 
  registerFormatter 
} from "~src/services/asset-formatter/asset-formatter.service"
import { ARC69JSONMetadata, ASA_TYPE_ARC69 } from "./arc69.interface"


export function validateARC69Note(metadata, parameters={} as AlgorandStandardAsset) {
  return JSON.stringify(JSON.parse(parameters.note)) === JSON.stringify(metadata)
}

export function factoryARC69(): ARC69JSONMetadata {
  return {
    standard: 'arc69',
    description: 'string', // Describes the asset to which this token represents.
    external_url: 'string', // A URI pointing to an external website. Borrowed from Open Sea's metadata format (https://docs.opensea.io/docs/metadata-standards).
    media_url: 'string', // A URI pointing to a high resolution version of the asset's media.
    properties: {}, // Properties following the EIP-1155 'simple properties' format. (https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1155.md#erc-1155-metadata-uri-json-schema)"
    mime_type: 'stringß', // Describes the MIME type of the ASA's URL (`au` field).
    attributes: [] // Deprecated. New NFTs should define attributes with the simple `properties` object. Marketplaces should support both the `properties` object and the `attributes` array). The `attributes` array follows Open Sea's format: https://docs.opensea.io/docs/metadata-standards#attributes
  }
}

export function Arc69AssetFormatter(body: Collection) {
  const proto = body.arc69 ?? {}
  return propertiesOf<AlgorandStandardAsset>().reduce((acc, prop) => {
    if (proto[prop]) Object.defineProperty(acc, prop, proto[prop])
    return acc
  }, {} as AlgorandStandardAsset)
}
registerFormatter(ASA_TYPE_ARC69, {format: Arc69AssetFormatter})

export function 
    validateARC69JSONMetadata(metadata: Collection): string[] | undefined {
  const metadataProperties = Object.keys(metadata)
  const arc69requisites = 
    propertiesOf<ARC69JSONMetadata>({optional: false}) as string[]
  const arc69publics = 
    propertiesOf<ARC69JSONMetadata>({public: true}) as string[]

  const issues = []
  for(let key in metadataProperties) {
    if(!arc69publics.includes(key)) {
      issues.push("${copy.unknownKey} '${key}'")
    }
  }
  for(let key in arc69requisites) {
    if(!metadataProperties.includes(key)) {
      issues.push("${copy.missingKey} '${key}'")
    }
  }

  return issues.length ? issues : undefined
}
