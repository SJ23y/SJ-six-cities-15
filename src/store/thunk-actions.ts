import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Dispatch, State } from '../types/state';
import { ApiRoute, AppRoute } from '../consts';
import { DetailedOffer, Offer, Offers } from '../types/offers';
import { redirectToRoute } from './actions';
import { dropToken, saveToken } from '../services/token';
import { AuthData, UserData } from '../types/auth';
import { Review, Reviews } from '../types/reviews';

const uploadOffers = createAsyncThunk<Offers, undefined, {dispatch: Dispatch; state: State; extra: AxiosInstance}>('uploadOffers', async (_arg, {extra: api}) => {
  const { data } = await api.get<Offers>(ApiRoute.Offers);
  return data;
});

const checkAuthorization = createAsyncThunk<void, undefined, {dispatch: Dispatch; state: State; extra: AxiosInstance}>('checkAuthorization', async (_arg, {extra: api}) => {
  await api.get(ApiRoute.Login);
});

const loginUser = createAsyncThunk<void, AuthData, {dispatch: Dispatch; state: State; extra: AxiosInstance}>('loginUser', async ({ email, password }, {dispatch, extra: api}) => {
  const {data: { token } } = await api.post<UserData>(ApiRoute.Login, {email, password});
  saveToken(token);
  dispatch(redirectToRoute(AppRoute.Main));
});

const logoutUser = createAsyncThunk<void, undefined, {dispatch: Dispatch; state: State; extra: AxiosInstance}>('logoutUser', async (_arg, {extra: api}) => {
  await api.delete(ApiRoute.Logout);
  dropToken();
});


const uploadOfferById = createAsyncThunk<DetailedOffer | void, string, {dispatch: Dispatch; state: State; extra: AxiosInstance}>('uploadOfferInfoById', async (offerId, { dispatch, extra: api}) => {
  try {
    const { data } = await api.get<DetailedOffer>(`${ApiRoute.Offers}/${offerId}`);
    return data;
  } catch {
    dispatch(redirectToRoute(AppRoute.Page404));
  }

});

const uploadNearbyOffers = createAsyncThunk<Offers, string, {dispatch: Dispatch; state: State; extra: AxiosInstance}>('uploadOfferById', async (offerId, {extra: api}) => {
  const { data } = await api.get<Offers>(`${ApiRoute.Offers}/${offerId}/nearby`);
  return data;
});

const uploadReviews = createAsyncThunk<Reviews, string, {dispatch: Dispatch; state: State; extra: AxiosInstance}>('uploadReviews', async (offerId, {extra: api}) => {
  const { data } = await api.get<Reviews>(`${ApiRoute.Comments}/${offerId}`);
  return data;
});

const uploadNewReview = createAsyncThunk<Review, {offerId: string; comment: string; rating: number; cb: () => void}, {dispatch: Dispatch; state: State; extra: AxiosInstance}>('loginUser', async ({ offerId, comment, rating, cb }, {extra: api}) => {
  const { data } = await api.post<Review>(`${ApiRoute.Comments}/${offerId}`, {comment, rating});
  cb();
  return data;
});

const uploadFavoriteOffers = createAsyncThunk<Offers, undefined, {dispatch: Dispatch; state: State; extra: AxiosInstance}>('uploadFavoriteOffers', async (_arg, {extra: api}) => {
  const { data } = await api.get<Offers>(ApiRoute.Favorites);
  return data;
});

const toggleFavoriteStatus = createAsyncThunk<Offer, {offerId: string; status: number}, {dispatch: Dispatch; state: State; extra: AxiosInstance}>('toggleFavoriteStatus', async ({offerId, status}, {extra: api}) => {
  const { data } = await api.post<Offer>(`${ApiRoute.Favorites}/${offerId}/${status}`);
  return data;
});

export {
  uploadOffers,
  checkAuthorization,
  loginUser,
  logoutUser,
  uploadOfferById,
  uploadNearbyOffers,
  uploadReviews,
  uploadNewReview,
  uploadFavoriteOffers,
  toggleFavoriteStatus
};


