import { propertiesOf } from 'ts-reflection'

import { Collection } from "~src/utilities/collection"
import { 
  AlgorandStandardAsset 
} from "~src/utilities/asset-formatters/asas/algorand-standard-asset.interface"
import { 
  registerFormatter 
} from '~src/services/asset-formatter/asset-formatter.service'
import { ARC3JSONMetadata, ASA_TYPE_ARC3 } from "./arc3.interface"


export function Arc3AssetFormatter(body: Collection) {
  const proto = body.arc3
  return propertiesOf<AlgorandStandardAsset>().reduce((acc, prop) => {
    if (proto[prop]) Object.defineProperty(acc, prop, proto[prop])
    return acc
  }, {} as AlgorandStandardAsset)
}
registerFormatter(ASA_TYPE_ARC3, {format: Arc3AssetFormatter})



export function 
    validateARC3JSONMetadata(metadata: Collection): string[] | undefined {
  const metadataProperties = Object.keys(metadata)
  const arc69requisites = 
    propertiesOf<ARC3JSONMetadata>({optional: false}) as string[]
  const arc69publics = 
    propertiesOf<ARC3JSONMetadata>({public: true}) as string[]

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

export function factoryARC3(): ARC3JSONMetadata {
  return {
    name: 'string', //Identifies the asset to which this token represents
    decimals: Infinity, // (integer) The number of decimal places that the token amount should display - e.g. 18, means to divide the token amount by 1000000000000000000 to get its user representation.
    description: 'string', // Describes the asset to which this token represents
    image: 'string', // A URI pointing to a file with MIME type image/* representing the asset to which this token represents. Consider making any images at a width between 320 and 1080 pixels and aspect ratio between 1.91:1 and 4:5 inclusive.
    image_integrity: 'string', // The SHA-256 digest of the file pointed by the URI image. The field value is a single SHA-256 integrity metadata as defined in the W3C subresource integrity specification (https://w3c.github.io/webappsec-subresource-integrity).
    image_mimetype: 'string', // The MIME type of the file pointed by the URI image. MUST be of the form 'image/*'.
    background_color: 'string', // Background color do display the asset. MUST be a six-character hexadecimal without a pre-pended #.
    external_url: 'string', // A URI pointing to an external website presenting the asset.
    external_url_integrity: 'string', // The SHA-256 digest of the file pointed by the URI external_url. The field value is a single SHA-256 integrity metadata as defined in the W3C subresource integrity specification (https://w3c.github.io/webappsec-subresource-integrity).
    external_url_mimetype: 'string', // The MIME type of the file pointed by the URI external_url. It is expected to be 'text/html' in almost all cases.
    animation_url: 'string', // A URI pointing to a multi-media file representing the asset.
    animation_url_integrity: 'string', // The SHA-256 digest of the file pointed by the URI external_url. The field value is a single SHA-256 integrity metadata as defined in the W3C subresource integrity specification (https://w3c.github.io/webappsec-subresource-integrity).
    animation_url_mimetype: 'string', // The MIME type of the file pointed by the URI animation_url. If the MIME type is not specified, clients MAY guess the MIME type from the file extension or MAY decide not to display the asset at all. It is STRONGLY RECOMMENDED to include the MIME type.
    properties: {}, // Arbitrary properties (also called attributes). Values may be strings, numbers, object or arrays.
    attributes: {}, // Arbitrary properties (also called attributes). Values may be strings, numbers, object or arrays.
    extra_metadata: 'string', // Extra metadata in base64. If the field is specified (even if it is an empty string) the asset metadata (am) of the ASA is computed differently than if it is not specified.
    localization: {
      uri: 'string', // The URI pattern to fetch localized data from. This URI should contain the substring `{locale}` which will be replaced with the appropriate locale value before sending the request.
      default: 'string', // The locale of the default data within the base JSON
      locales: [], // The list of locales for which data is available. These locales should conform to those defined in the Unicode Common Locale Data Repository (http://cldr.unicode.org/).
      integrity:  {} // The SHA-256 digests of the localized JSON files (except the default one). The field name is the locale. The field value is a single SHA-256 integrity metadata as defined in the W3C subresource integrity specification (https://w3c.github.io/webappsec-subresource-integrity).
    }  }
}
