import { isA } from 'ts-type-checked'
import { propertiesOf } from 'ts-reflection'

import { ValidationFunction } from '~src/utilities/validation-function.type'
import { 
  ARC3JSONMetadata, ASA_TYPE_ARC3 as arc3 
} from '~src/utilities/asset-formatters/asas/arc3/arc3.interface'
import { 
  ARC69JSONMetadata, ASA_TYPE_ARC69 as arc69 
} from '~src/utilities/asset-formatters/asas/arc69/arc69.interface'
import {factoryARC3} from '~src/utilities/asset-formatters/asas/arc3'
import { 
  AlgorandStandardAsset 
} from '~src/utilities/asset-formatters/asas/algorand-standard-asset.interface'
import {
  factoryARC69, validateARC69Note 
} from '~src/utilities/asset-formatters/asas/arc69'
import { copy } from './copy'


/* validate the query parameters and basic structure of the http post */
export const validateRequest: ValidationFunction = req => {  
  // // `filename` is required property to use multi-part npm package
  // if (!req.body?.filename) return { message: copy.body.filename }
  // // 'signature' is per user and maps their ipfs to their ipns
  // if (!req.body?.signature) return { message: copy.body.signature }
      
  // if (!req.body?.license) return { message: copy.body.license }
  // if (!req.body?.intent) return { message: copy.body.intent }
  
  if (!req.body?.asa_type) return { message: copy.body.asa_type.missing }
  switch (req.body.asa_type) {
    case arc3: {
      if(!req.body?.arc3) return { message: copy.body.arc3.missing }

      const allProperties = propertiesOf<ARC3JSONMetadata>().map(String)
      const required = propertiesOf<ARC3JSONMetadata>({optional: false})

      if (!required.every(p => req.body.arc3?.hasOwnProperty(p)))
        return { 
          message: copy.body.arc3.required + ` [${required.join(', ')}]` 
        }
      if (!Object.keys(req.body.arc3).every(p => allProperties.includes(p)))
        return { 
          message: copy.body.arc3.unknown + ` [${allProperties.join(', ')}]` 
        }

      let minimalTypeRepresentation = Object.assign({}, factoryARC3(), 
        req.body.arc3)
      if(!isA<ARC3JSONMetadata>(minimalTypeRepresentation))
        return { message: copy.body.arc3.invalid }

        if(!isA<AlgorandStandardAsset>(req.body.createAsset ?? {}))
        return { message: copy.body.createAsset.invalidOrMissing }
      break
    }
    case arc69: {
      if(!req.body?.arc69) return { message: copy.body.arc69.missing }

      const allProperties = propertiesOf<ARC69JSONMetadata>().map(String)
      const required = propertiesOf<ARC69JSONMetadata>({optional: false})

      if (!required.every(p => req.body.arc69?.hasOwnProperty(p)))
        return { 
          message: copy.body.arc69.required + ` [${required.join(', ')}]` 
        }
      if (!Object.keys(req.body.arc69).every(p => allProperties.includes(p)))
        return { 
          message: copy.body.arc69.unknown + ` [${allProperties.join(', ')}]` 
        }

      let minimalTypeRepresentation = Object.assign({}, factoryARC69(), 
        req.body.arc69)
      if(!isA<ARC69JSONMetadata>(minimalTypeRepresentation))
        return { message: copy.body.arc69.invalid }

      if(req.body?.createAsset) {
        const properties = propertiesOf<AlgorandStandardAsset>().map(String)
        if (!Object.keys(req.body.createAsset)
            .every(p => properties.includes(p))) {
          return { 
            message: copy.body.createAsset.invalid + ` [${properties.join(', ')}]` 
          }
        }

        if(req.body.createAsset.note 
            && !validateARC69Note(req.body.arc69, req.body.createAsset))
          return { message: copy.body.createAsset.note }
      }      
      break  
    }
    default:
      return { message: copy.body.asa_type.unknown }  
  }
}
