import { Collection } from "~src/utilities/collection"
import { copy as sharedCopy } from "~src/errors/copy"


export const copy: Collection = {
  ...sharedCopy,
  body: {
    ipfs: "the ipfs parameter is required",
    ipns: "the ipns parameter is required",
    filename: "the filename of the asset is required",
    signature: "the signature of the user account is required",
    account: "the algorand address is required in the account field",
    txn: "base 64 encoded transaction is required",
  }
}
