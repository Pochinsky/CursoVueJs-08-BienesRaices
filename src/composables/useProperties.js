import { computed, ref } from "vue";
import { useFirestore, useCollection } from "vuefire";
import { collection } from "firebase/firestore";

export default function useProperties() {
  const pool = ref(false);

  const db = useFirestore();
  const propertiesCollection = useCollection(collection(db, "properties"));

  const propertiesFiltered = computed(() => {
    return pool.value
      ? propertiesCollection.value.filter((property) => property.pool)
      : propertiesCollection.value;
  });

  return { pool, propertiesCollection, propertiesFiltered };
}
