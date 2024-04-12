import { memo, useEffect, useRef } from 'react';
import { Icon, Marker, layerGroup } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/use-map';
import { OfferLocation } from '../../types/offers';
import { useLocation } from 'react-router-dom';
import { AppRoute, MapSize } from '../../consts';

type MapProps = {
  cityLocation: null | OfferLocation;
  points: OfferLocation[] | null;
  selectedPoint?: OfferLocation | null;
};

const defaultCustomIcon = new Icon({
  iconUrl: '/SJ-six-cities-15/img/pin.svg',
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
});

const currentCustomIcon = new Icon({
  iconUrl: '/SJ-six-cities-15/img/pin-active.svg',
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
});

function MapTemplate({
  cityLocation,
  points,
  selectedPoint,
}: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, cityLocation);
  const { pathname } = useLocation();
  const mapHeight = (pathname as AppRoute) === AppRoute.Main ? MapSize.Main.height : MapSize.Offer.height;
  const mapWidth = (pathname as AppRoute) === AppRoute.Main ? MapSize.Main.width : MapSize.Offer.width;

  useEffect(() => {
    if (map && cityLocation && points) {
      const markerLayer = layerGroup().addTo(map);
      points.forEach((point) => {
        const marker = new Marker({
          lat: point.latitude,
          lng: point.longitude,
        });

        marker
          .setIcon(
            point !== selectedPoint ? defaultCustomIcon : currentCustomIcon,
          )
          .addTo(markerLayer);
      });
      map.setView(
        [cityLocation.latitude, cityLocation.longitude],
        cityLocation.zoom,
      );
      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, points, selectedPoint, cityLocation]);

  return (
    <div
      className="map"
      ref={mapRef}
      style={{ height: mapHeight, width: mapWidth, margin: '0 auto' }}
    >
    </div>
  );
}

const Map = memo(MapTemplate);

export default Map;
