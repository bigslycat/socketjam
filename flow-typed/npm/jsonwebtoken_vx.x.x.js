declare module 'jsonwebtoken' {
  declare type PrimType = boolean | string | number;
  declare type ObjType = { [key: string]: ?PlainType };
  declare type ArrType = Array<?PlainType>;
  declare type PlainType = PrimType | ObjType | ArrType;

  declare function verify (
    token: string,
    secretOrPublicKey: string,
    options: ?{
      algorithms?: Array<String>,
      audience?: string,
      issuer?: string,
      ignoreExpiration?: boolean,
      ignoreNotBefore?: boolean,
      subject?: string,
      clockTolerance?: number,
      jwtid?: string,
    },
    callback: ?(err: PlainType, decoded: PlainType) => void,
  ): void;
  declare function sign (payload: PlainType, secret: string): string;
}
