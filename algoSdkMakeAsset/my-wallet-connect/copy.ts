import { Collection } from "~src/utilities/collection"
import { copy as sharedCopy } from "~src/errors/copy"


export const copy: Collection = {
  ...sharedCopy,
  body: {
    ipfs: "the ipfs parameter is required",
    ipns: "the ipns parameter is required",
    asa_type: {
      missing: "the type of asa payload must be specified",
      unknown: "the asa specified is unknown"
    },
    arc69: { 
      missing: 'the arc69 payload is required',
      invalid: 'the arc69 payload contains an invalid property',
      required: 'the arc69 JSON metadata payload is missing required properties',
      unknown: 'the arc69 JSON metadata payload has unknown properties',
    },
    arc3: {
      missing: 'the arc3 JSON metadata payload is required',
      invalid: 'the arc3 payload contains an invalid property',
      required: 'the arc3 JSON metadata payload is missing required properties',
      unknown: 'the arc3 JSON metadata payload has unknown properties',
    },
    filename: "the filename of the asset is required",
    signature: "the signature of the user account is required",
    license: "the licence (of the asset) is required",
    intent: "the intent (of publishing this asset as an nft) is required",
    createAsset: {
      invalid: "the createAsset parameter is invalid",
      note: "the note of the asset is not a json string of the arc69 metadata"
    }
  }
}
