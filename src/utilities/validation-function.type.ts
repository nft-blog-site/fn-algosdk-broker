export type ValidationFunction = (HttpRequest) => Invalidation
export type Invalidation = {message: string} | undefined
