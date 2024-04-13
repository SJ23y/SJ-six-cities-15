import { Link, Outlet, useNavigate } from 'react-router-dom';
import { AppRoute } from '../../consts';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks/use-app-dispatch';
import {
  checkAuthentication,
  getUserInfo,
} from '../../store/user-process/selectors';
import {
  getFavoriteOffers,
  getOffers,
} from '../../store/main-process/selectors';
import { useFavoriteOffers } from '../../hooks/use-favorite-offers';
import { logoutUser } from '../../store/user-process/thunk-actions';
import { Helmet } from 'react-helmet-async';

function Layout(): JSX.Element {
  const favoriteOffers = useAppSelector(getFavoriteOffers);
  const offers = useAppSelector(getOffers);
  const user = useAppSelector(getUserInfo);
  const isAuth = useAppSelector(checkAuthentication);
  const pathname = window.location.pathname as AppRoute;
  const path = window.location.hostname;
  console.log(path);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isNotLogin = pathname !== AppRoute.Login;

  useFavoriteOffers(favoriteOffers, isAuth);

  const handleLogoutClick = (evt: React.MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    if (isAuth) {
      dispatch(logoutUser());
      navigate(AppRoute.Main);
    }
  };

  return (
    <div
      className={classNames({
        'page': true,
        'page--gray page--main': pathname === AppRoute.Main,
        'page--gray page--login': pathname === AppRoute.Login,
        'page--favorites-empty':
          pathname === AppRoute.Favorites && favoriteOffers?.length === 0,
        'page__main--index-empty':
          pathname === AppRoute.Main && offers?.length === 0,
      })}
    >
      <Helmet>
        { (path === 'sj23y.github.io') ? <link rel="stylesheet" href="/SJ-six-cities-15/css/main.css" /> : null }
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link
                className={classNames({
                  'header__logo-link': true,
                  'header__logo-link--active': pathname === AppRoute.Main,
                })}
                to={AppRoute.Main}
                onClick={() => navigate(AppRoute.Main)}
              >
                <img
                  className="header__logo"
                  src="/SJ-six-cities-15/img/logo.svg"
                  alt="6 cities logo"
                  width="81"
                  height="41"
                />
              </Link>
            </div>
            {isNotLogin && (
              <nav className="header__nav">
                <ul className="header__nav-list">

                  <li className="header__nav-item user">
                    <Link
                      className="header__nav-link header__nav-link--profile"
                      to={isAuth ? AppRoute.Favorites : AppRoute.Login}
                    >
                      { isAuth && (
                        <>
                          <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                          <span className="header__user-name user__name">
                            {user?.email}
                          </span>
                          <span className="header__favorite-count">
                            {favoriteOffers ? favoriteOffers.length : ''}
                          </span>
                        </>
                      )}

                      { !isAuth && (
                        <>
                          <div
                            className="header__avatar-wrapper user__avatar-wrapper"
                          >
                          </div>
                          <span className="header__login">Sign in</span>
                        </>
                      )}

                    </Link>
                  </li>

                  {isAuth && (
                    <li className="header__nav-item">
                      <Link
                        className="header__nav-link"
                        to={isAuth ? AppRoute.Login : AppRoute.Main}
                        onClick={handleLogoutClick}
                      >
                        <span className='header__signout'>
                        Sign Out
                        </span>
                      </Link>
                    </li>
                  )}
                </ul>
              </nav>
            )}
          </div>
        </div>
      </header>
      <Outlet />
    </div>
  );
}

export default Layout;
