import { computed, ref } from "vue";
import { useFirestore, useCollection, useFirebaseStorage } from "vuefire";
import { collection, doc, deleteDoc } from "firebase/firestore";
import { ref as storageRef, deleteObject } from "firebase/storage";

export default function useProperties() {
  const pool = ref(false);

  const storage = useFirebaseStorage();
  const db = useFirestore();
  const propertiesCollection = useCollection(collection(db, "properties"));

  const propertiesFiltered = computed(() => {
    return pool.value
      ? propertiesCollection.value.filter((property) => property.pool)
      : propertiesCollection.value;
  });

  const deleteProperty = async (id, imageUrl) => {
    if (
      confirm(
        "Una vez eliminada, la propiedad no podrá recuperarse. ¿Desea eliminarla igualmente?"
      )
    ) {
      const docRef = doc(db, "properties", id);
      const imageRef = storageRef(storage, imageUrl);

      await Promise.all([
        await deleteDoc(docRef),
        await deleteObject(imageRef),
      ]);
    }
  };

  return { pool, propertiesCollection, propertiesFiltered, deleteProperty };
}
