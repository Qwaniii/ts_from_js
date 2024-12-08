import * as translations from './translations';

/**
 * Перевод 
 */

export type LangKeys = keyof typeof translations

type NestedKeys<T> ={
  [K in keyof T]: T[K] extends object
    ? K extends string
      ? `${K}` | `${K}.${NestedKeys<T[K]>}`
      : never
    : K extends string
      ? K
      : never
}[keyof T];

export type TextKey = NestedKeys<typeof translations['ru']> | string & {}

export default function translate(lang:LangKeys, text: TextKey, plural?: number): string {

  const keys = text.split('.');

  let result: any = translations[lang];

  for (const key of keys) {
    if (result && typeof result === 'object' && key in result) {
      result = result[key];
    } else {
      return text;
    }
  }

  if (typeof plural !== 'undefined') {
    const pluralKey = new Intl.PluralRules(lang).select(plural);
    if (typeof result === 'object' && pluralKey in result) {
      result = result[pluralKey];
    }
  }

  return typeof result === 'string' ? result : text;
}
