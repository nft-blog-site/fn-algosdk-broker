import { Collection } from "~src/utilities/collection"


export interface AssetFormatter {
  format: (body: JSON) => Collection
}
