export function camelToSnake(str: string): string {
  if (str.includes('_')) {
    return str;
  }
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
    .replace(/([a-zA-Z])([0-9]+)/g, '$1_$2')
    .toLowerCase();
}

type Primitive = string | number | boolean | null | undefined | symbol | bigint;

type SnakeCase<S extends string> = S extends `${infer T}${infer U}`
  ? U extends Uncapitalize<U>
    ? `${Lowercase<T>}${SnakeCase<U>}`
    : `${Lowercase<T>}_${SnakeCase<Uncapitalize<U>>}`
  : S;

export type SnakeCasedPropertiesDeep<T> = T extends Primitive
  ? T
  : T extends Array<infer U>
    ? SnakeCasedPropertiesDeep<U>[]
    : T extends object
      ? {
          [K in keyof T as K extends string
            ? SnakeCase<K>
            : K]: SnakeCasedPropertiesDeep<T[K]>;
        }
      : T;

export function convert<T extends Record<string, unknown>>(
  obj: T
): Record<string, unknown> {
  const result: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(obj)) {
    const newKey = camelToSnake(key);

    if (Array.isArray(value)) {
      // Special handling for dataEdukasi - keep as array
      if (key === 'dataEdukasi' || newKey === 'data_edukasi') {
        result[newKey] = value;
      } else {
        result[newKey] = value.join(',');
      }
    } else if (typeof value === 'object' && value !== null) {
      result[newKey] = convert(value as Record<string, unknown>);
    } else {
      result[newKey] = value;
    }
  }

  return result;
}

export function arrayToString(arr: string[] | undefined | null): string {
  if (!arr || arr.length === 0) return '';
  return arr.join(',');
}

export function stringToArray(str: string | undefined | null): string[] {
  if (!str || str.trim() === '') return [];
  return str
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);
}

export function formatDate(isoString?: string | null): string {
  if (!isoString) return '';

  const date = new Date(isoString);
  if (isNaN(date.getTime())) return '';

  const pad = (n: number) => n.toString().padStart(2, '0');

  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1);
  const year = date.getFullYear();

  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
}

export function revert(str: string | null): string {
  if (!str) return '';
  return str.replace(/_([a-z0-9])/g, (_, g1) => g1.toUpperCase());
}
