import React, { createContext, useMemo, useState } from 'react';
import  translate, {LangKeys, TextKey} from './translate';
/**
 * @type {React.Context<{}>}
 */
type useTranslateType ={
  lang?: LangKeys
  t: (text: TextKey, number?: number) => string
}
export const I18nContext: React.Context<useTranslateType> = createContext({} as useTranslateType );
/**
 * Обертка над провайдером контекста, чтобы управлять изменениями в контексте
 * @param children
 * @return {JSX.Element}
 */
type I18nProviderProps ={
  children: React.ReactNode
}

export const I18nProvider: React.FC<I18nProviderProps>= ({ children }) => {
  const [lang, setLang] = useState<LangKeys>('ru');

  const i18n = useMemo(
    () => ({
      // Код локали
      lang,
      // Функция для смены локали
      setLang,
      // Функция для локализации текстов с замыканием на код языка
      t: (text: TextKey, number?: number) => translate(lang, text, number),
    }),
    [lang],
  );

  return <I18nContext.Provider value={i18n}>{children}</I18nContext.Provider>;
}
