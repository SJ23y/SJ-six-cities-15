import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { DEFAULT_CITY, NameSpace, SortBy } from '../../consts';
import { MainProcess } from '../../types/state';
import { toggleFavoriteStatus, uploadFavoriteOffers, uploadOffers } from '../thunk-actions';
import { sortAndFilterOffers } from '../../utils';

const initialState: MainProcess = {
  city: DEFAULT_CITY,
  initialOffers: null,
  offers: null,
  sortBy: SortBy.Popular,
  isLoading: false,
  errorStatus: false,
  favoriteOffers: null
};


const mainProcess = createSlice({
  name: NameSpace.OFFERS,
  initialState,
  reducers: {
    changeSortBy: (state, action: PayloadAction<{sortBy: SortBy}>) => {
      state.sortBy = action.payload.sortBy;
    },
    updateOffers: (state) => {
      if (state.initialOffers) {
        state.offers = sortAndFilterOffers(state.city, state.sortBy, state.initialOffers);
      }
    },
    changeCity: (state, action: PayloadAction<{city: string}>) => {
      state.city = action.payload.city;
    }

  },
  extraReducers(builder) {
    builder
      .addCase(uploadOffers.pending, (state) => {
        state.isLoading = true;
        state.errorStatus = false;
      })
      .addCase(uploadOffers.fulfilled, (state, action) => {
        state.initialOffers = action.payload;
        state.offers = sortAndFilterOffers(state.city, state.sortBy, state.initialOffers);
        state.isLoading = false;
      })
      .addCase(uploadOffers.rejected, (state) => {
        state.errorStatus = true;
        state.isLoading = false;
      })
      .addCase(uploadFavoriteOffers.fulfilled, (state, action) => {
        state.favoriteOffers = action.payload;
      })
      .addCase(toggleFavoriteStatus.fulfilled, (state, action) => {
        if (state.initialOffers) {
          const index = state.initialOffers.findIndex((offer) => offer.id === action.payload.id);
          state.initialOffers = [...state.initialOffers.slice(0, index), action.payload, ...state.initialOffers.slice(index + 1)];
          state.offers = sortAndFilterOffers(state.city, state.sortBy, state.initialOffers);
        }
        if (state.favoriteOffers) {
          state.favoriteOffers = (action.payload.isFavorite) ? [...state.favoriteOffers, action.payload] : [...state.favoriteOffers.filter((offer) => offer.id !== action.payload.id)];
        } else {
          state.favoriteOffers = [action.payload];
        }
      });
  },

});


const { updateOffers, changeSortBy, changeCity } = mainProcess.actions;

export {
  updateOffers,
  changeSortBy,
  changeCity,
  mainProcess
};
