import {createRoot, hydrateRoot, Root} from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ServicesContext } from './context';
import { I18nProvider } from './i18n/context';
import App from './app';
import Services from './services';
import config from './config';


const services = new Services(config);

const rootDom = document.getElementById('root') as HTMLElement;
const root: Root = createRoot(rootDom);

// Первый рендер приложения
const jsx = <Provider store={services.redux}>
    <ServicesContext.Provider value={services}>
      <I18nProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </I18nProvider>
    </ServicesContext.Provider>
  </Provider>
;

if(window.STORE) {
  hydrateRoot(rootDom, jsx)
} else {
  root.render(jsx)
}

console.log(services)