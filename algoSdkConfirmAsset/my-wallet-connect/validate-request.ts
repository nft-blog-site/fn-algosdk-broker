import { ValidationFunction } from '~src/utilities/validation-function.type'
import { copy } from './copy'


/* validate the query parameters and basic structure of the http post */
export const validateRequest: ValidationFunction = req => {  
  if (!req.body?.assetURL) return { message: copy.body.assetURL }
  
  if (!req.body?.account) return { message: copy.body.account }
  
  if (!req.body?.txn) return { message: copy.body.txn }  
}
