import { Context, HttpRequest } from "@azure/functions"


export type MethodHandler = (context: Context, req: HttpRequest) => void

export interface SideEffect {
  conditional(params: {key: string, value: any}): boolean
  effector: MethodHandler
}
