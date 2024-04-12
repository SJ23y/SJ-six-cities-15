import { StatusCodes } from 'http-status-codes';

const CITIES = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
];

const DEFAULT_CITY = 'Paris';
const AUTH_TOKEN_KEY_NAME = 'six-cities-token';
const RATING_TITLES = ['perfect', 'good', 'not bad', 'badly', 'terribly'];

enum DateFormat {
  ReviewField = 'MMMM YYYY',
  ReviewValue = 'YYYY-MM-DD',
}

const MapSize = {
  Main: {width: '100%', height: '550px'},
  Offer: {width: '1144px', height: '579px'}
} as const;

enum ApiRoute {
  Offers = '/offers',
  Login = '/login',
  Favorites = '/favorite',
  Logout = '/logout',
  Comments = '/comments',
}

const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.NOT_FOUND]: true,
};

const Setting = {
  OffersCount: 5,
  OfferImagesCount: 6,
  MaxRating: 5,
  NearbyOffersCount: 3,
  ReviewsShownCount: 10,
  BaseUrl: 'https://15.design.htmlacademy.pro/six-cities',
  ApiTimeout: 5000,
  CommentMaxLength: 300,
  CommentMinLength: 50
} as const;

enum SortBy {
  Popular = 'Popular',
  PriceUp = 'Price: low to high',
  PriceDown = 'Price: high to low',
  Rating = 'Top rated first',
}

enum PlaceCardClassNamePrefix {
  Main = 'cities',
  Favorites = 'favorites',
  Offer = 'near-places',
}

const PlaceCardImageSize = {
  SMALL: { width: '150', height: '110' },
  LARGE: { width: '260', height: '200' },
} as const;

enum AppRoute {
  Main = '/SJ-six-cities-15/',
  Login = '/SJ-six-cities-15/login',
  Favorites = '/SJ-six-cities-15/favorites',
  Offer = '/SJ-six-cities-15/offer/:offerId',
  Page404 = '/404',
}

enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

enum NameSpace {
  OFFERS = 'OFFERS',
  OFFER = 'OFFER',
  USER = 'USER',
}

export {
  Setting,
  AppRoute,
  AuthorizationStatus,
  PlaceCardImageSize,
  PlaceCardClassNamePrefix,
  DateFormat,
  CITIES,
  DEFAULT_CITY,
  SortBy,
  AUTH_TOKEN_KEY_NAME,
  ApiRoute,
  StatusCodeMapping,
  NameSpace,
  RATING_TITLES,
  MapSize
};
