import { Link, useNavigate } from 'react-router-dom';
import { AppRoute } from '../../consts';
import { Helmet } from 'react-helmet-async';
import React from 'react';
import './404.css';

function Page404() {
  const path = window.location.pathname;
  const navigate = useNavigate();

  if (path === '/SJ-six-cities-15/' || path === '/SJ-six-cities-15') {
    navigate(AppRoute.Main);
  }
  return (
    <React.Fragment>
      <Helmet>
        <title>404. Страница не найдена</title>
      </Helmet>
      <div className="flex-container">
        <div className="text-center">
          <h1>
            <span className="fade-in" id="digit1">
              4
            </span>
            <span className="fade-in" id="digit2">
              0
            </span>
            <span className="fade-in" id="digit3">
              4
            </span>
          </h1>
          <h3 className="fadeIn">СТРАНИЦА НЕ НАЙДЕНА</h3>
          <Link to={AppRoute.Main}>ПЕРЕЙТИ НА ГЛАВНУЮ</Link>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Page404;
