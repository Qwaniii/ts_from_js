import { useEffect } from 'react';
import useServices from './use-services';

/**
 * Хук для асинхронных расчётов, которые будут исполнены при первом рендере или изменении depends.
 * @param initFunc {Function} Пользовательская функция
 * @param depends {Array} Значения при смене которых callback снова исполнится.
 * @param options {{backForward}}
 */
export default function useInit(initFunc, depends = [], backForward = false, name = '') {
  const services = useServices()

  if (process.env.IS_NODE) {
    if (!services.ssr.isNameExists(name)) {
      const promise = initFunc(false);
      // @TODO Если колбэка возвращает промис, то добавляем его в общий список ожиданий
      services.ssr.add(promise, name);
    }
  }

  useEffect(() => {
    // @TODO Если хук вызывался при рендере на сервере, то при первом рендере на клиенте не надо вызывать так как инициализация уже выполнена!
    // @TODO Как понять, что именно этот хук в конкретном компоненте вызвался??
    // @TODO И как на клиенте узнать узнать, что хук вызывался на сервере??

    if (!services.ssr.isNameExists(name)) {
      services.ssr.clearName(name);
      initFunc(false);
    }

    // Если в истории браузера меняются только search-параметры, то react-router не оповестит
    // компонент об изменениях, поэтому хук можно явно подписать на событие изменения истории
    // браузера (если нужно отреагировать на изменения search-параметров при переходе по истории)
    if (backForward) {
      window.addEventListener('popstate', initFunc);
      return () => {
        window.removeEventListener('popstate', initFunc);
      };
    }
  }, depends);
}
