import { userStore } from '@/store/user';
import { useEffect, useRef } from 'react'
import { Loader } from '@googlemaps/js-api-loader';

const useMaptracking = (vehicleID, latitude, longitude) => {
  const user = userStore((state) => state.user);
  const center = { lat: latitude, lng: longitude };
  const mapRef = useRef(null);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        version: "weekly",
      });

      const { Map } = await loader.importLibrary("maps");

      const { Marker } = await loader.importLibrary("marker");

      const mapOptions = {
        center,
        zoom: 15,
        mapId: "lifemap",
      };

      const map = new Map(mapRef.current, mapOptions);
      const currentPositionMarker = new Marker({
        position: center,
        map: map,
        title: "Posição atual",
        draggable: false,
        animation: 2,
      })
    }

    initMap();
  }, [vehicleID]);

  return { mapRef }
}

export default useMaptracking