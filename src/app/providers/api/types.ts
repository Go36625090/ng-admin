export namespace API{
  export interface method {
    name: string
  }
  // export function Method(w: string): string
  export interface endpoint {
    pattern: string
  }

  export function isMethod(object: any): boolean{
    return 'name' in object;
  }

  export function isEndpoint(object: any): boolean{
    return 'pattern' in object;
  }
}

