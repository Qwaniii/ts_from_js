import { useCallback, useContext } from 'react';
import { I18nContext } from '../i18n/context';
import { LangKeys, TextKey } from '../i18n/translate';
// import {I18nContextValue} from "../i18n/context";

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */


export default function useTranslate() {
  return useContext(I18nContext);
}
