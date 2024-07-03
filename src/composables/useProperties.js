import { computed } from "vue";
import { useFirestore, useCollection } from "vuefire";
import { collection } from "firebase/firestore";

export default function useProperties() {
  const db = useFirestore();
  const propertiesCollection = useCollection(collection(db, "properties"));

  const priceProperty = computed(() => {
    return (price) =>
      Number(price).toLocaleString("es-CL", {
        style: "currency",
        currency: "CLP",
      });
  });

  return { propertiesCollection, priceProperty };
}
