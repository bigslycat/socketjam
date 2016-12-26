// @flow

export type JwtOptionsType = {
  algorithms?: Array<String>,
  audience?: string,
  issuer?: string,
  ignoreExpiration?: boolean,
  ignoreNotBefore?: boolean,
  subject?: string,
  clockTolerance?: number,
  jwtid?: string,
};
