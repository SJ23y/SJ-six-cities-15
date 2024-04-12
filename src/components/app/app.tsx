import { AppRoute } from '../../consts';
import Favorites from '../../pages/favorites/favorites';
import Login from '../../pages/login/login';
import Main from '../../pages/main/main-page';
import { Route, Routes } from 'react-router-dom';
import OfferPage from '../../pages/offer-page/offer-page';
import PrivateRoute from '../private-route/private-route';
import Page404 from '../../pages/page-404/page-404';
import { HelmetProvider } from 'react-helmet-async';
import Layout from '../layout/layout';
import { useAppSelector } from '../../hooks/use-app-dispatch';
import Loader from '../loader/loader';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';
import {
  getErrorStatus,
  getLoadingStatus,
} from '../../store/main-process/selectors';
import { ErrorScreen } from '../error-screen/error-screen';

function App(): JSX.Element {
  const isLoading = useAppSelector(getLoadingStatus);
  const isError = useAppSelector(getErrorStatus);

  if (isLoading) {
    return (
      <HelmetProvider>
        <Loader />
      </HelmetProvider>
    );
  }

  if (isError) {
    return <ErrorScreen />;
  }

  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route path={AppRoute.Main} element={<Layout />}>
            <Route index element={<Main />} />

            <Route path={AppRoute.Login} element={<Login />} />

            <Route
              path={AppRoute.Favorites}
              element={
                <PrivateRoute>
                  <Favorites />
                </PrivateRoute>
              }
            />

            <Route path={AppRoute.Offer} element={<OfferPage />} />

            <Route path="*" element={<Page404 />} />
          </Route>
        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  );
}

export default App;
