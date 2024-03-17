import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import offers from './mocks/offers';
import { Provider } from 'react-redux';
import { store } from './store';
import { checkAuthorization, uploadOffers } from './store/thunk-actions';

store.dispatch(uploadOffers());
store.dispatch(checkAuthorization());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App offers = { offers } />
    </React.StrictMode>
  </Provider>
);
