import React, { memo, useCallback } from 'react';
import { PlaceCardImageSize, PlaceCardClassNamePrefix } from '../../consts';
import { Offer, Offers } from '../../types/offers';
import PlaceCard from '../place-card/place-card';

type OffersListProps = {
  offers: Offers;
  classNamePrefix: PlaceCardClassNamePrefix;
  onActiveCardChange?: (id: string | null) => void;
}

function OffersListTemplate({offers, classNamePrefix, onActiveCardChange }: OffersListProps): JSX.Element {
  const imageSize = (classNamePrefix === PlaceCardClassNamePrefix.Favorites) ? PlaceCardImageSize.SMALL : PlaceCardImageSize.LARGE;

  const placeCardMouseEnterHandler = useCallback((id: string) => {
    if (onActiveCardChange) {
      onActiveCardChange(id);
    }
  }, [onActiveCardChange]);
  const placeCardMouseLeaveHandler = useCallback(() => {
    if (onActiveCardChange) {
      onActiveCardChange(null);
    }
  }, [onActiveCardChange]);


  return (
    <React.Fragment>
      {offers.map((offer: Offer): JSX.Element => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          classNamePrefix={classNamePrefix}
          imageSize={imageSize}
          onMouseEnter={placeCardMouseEnterHandler}
          onMouseLeave={placeCardMouseLeaveHandler}
        />))}
    </React.Fragment>

  );
}

const OffersList = memo(OffersListTemplate);

export default OffersList;
