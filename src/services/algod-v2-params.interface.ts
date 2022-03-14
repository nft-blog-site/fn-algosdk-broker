import { BaseHTTPClient } from "algosdk"
import { AlgodTokenHeader, CustomTokenHeader } from "algosdk/dist/types/src/client/urlTokenBaseHTTPClient"

export interface Algodv2Params { 
  tokenOrBaseClient: string | AlgodTokenHeader | CustomTokenHeader | BaseHTTPClient, 
  baseServer?: string, 
  port?: string | number, 
  headers?: Record<string, string>
}
