import {deprecated} from "~src/utilities/deprecated.type"
import { Collection } from "~src/utilities/collection"


// https://github.com/algorandfoundation/ARCs/blob/main/ARCs/arc-0069.md
export const ASA_TYPE_ARC69 = 'arc69'

export interface ARC69JSONMetadata {
  standard: 'arc69'
  description?: string // Describes the asset to which this token represents.
  external_url?: string // A URI pointing to an external website. Borrowed from Open Sea's metadata format (https://docs.opensea.io/docs/metadata-standards).
  media_url?: string // A URI pointing to a high resolution version of the asset's media.
  properties?: Collection // Properties following the EIP-1155 'simple properties' format. (https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1155.md#erc-1155-metadata-uri-json-schema)"
  mime_type?: string // Describes the MIME type of the ASA's URL (`au` field).
  attributes?: deprecated & string[] // Deprecated. New NFTs should define attributes with the simple `properties` object. Marketplaces should support both the `properties` object and the `attributes` array). The `attributes` array follows Open Sea's format: https://docs.opensea.io/docs/metadata-standards#attributes
}
