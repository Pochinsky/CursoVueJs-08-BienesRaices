import { ref } from "vue";

export default function useLocationMap() {
  const zoom = ref(15);
  const center = ref([-33.448449, -70.669363]);

  function pin(e) {
    const marker = e.target.getLatLng();
    center.value = [marker.lat, marker.lng];
  }

  return { zoom, center, pin };
}
