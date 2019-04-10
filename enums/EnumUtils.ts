// Helper functions for typescript string enum
// The language itself cannot enforce a enum type to be passed. 
export namespace EnumUtils {

  export function values(em: any): string[] {
    let values = [];
    for (let e in em) {
      let value = em[e];
      if (typeof(value) === 'string') {
        values.push(value);
      }
    }
    return values;
  }

  export function value(em: any, str: string) {
    for (let e in em) {
      let value = em[e];
      if (value === str) {
        return e;
      }
    }
    return str;
  }

  export function toString(em: any, str: string) {
    if (em[str]) {
      return em[str];
    }
    return str;
  }
};