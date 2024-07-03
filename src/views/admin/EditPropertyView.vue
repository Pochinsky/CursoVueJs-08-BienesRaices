<script setup>
import { watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";
import { useFirestore, useDocument } from "vuefire";
import { useField, useForm } from "vee-validate";
import { doc, updateDoc } from "firebase/firestore";
import useImage from "@/composables/useImage";
import useLocationMap from "@/composables/useLocationMap";
import { validationSchema } from "@/validation/propertySchema";
import "leaflet/dist/leaflet.css";

const items = [1, 2, 3, 4, 5];

const route = useRoute();
const router = useRouter();
const db = useFirestore();
const docRef = doc(db, "properties", route.params.id);
const property = useDocument(docRef);
const { url, uploadImage, imageUrl } = useImage();
const { zoom, center, pin } = useLocationMap();
const { handleSubmit } = useForm({ validationSchema });

const name = useField("name");
const image = useField("image");
const price = useField("price");
const rooms = useField("rooms");
const bathrooms = useField("bathrooms");
const parkings = useField("parkings");
const description = useField("description");
const pool = useField("pool");

watch(property, (property) => {
  name.value.value = property.name;
  price.value.value = property.price;
  rooms.value.value = property.rooms;
  bathrooms.value.value = property.bathrooms;
  parkings.value.value = property.parkings;
  description.value.value = property.description;
  pool.value.value = property.pool;
  center.value = property.ubication;
});

const submit = handleSubmit(async (values) => {
  const { image, ...property } = values;
  if (url.value) {
    const data = { ...property, image: url.value, ubication: center.value };
    await updateDoc(docRef, data);
  } else {
    const data = { ...property, ubication: center.value };
    await updateDoc(docRef, data);
  }
  router.push({ name: "properties" });
});
</script>

<template>
  <v-card max-width="800" flat class="mx-auto">
    <v-card-title class="text-center text-h3 font-weight-bold" tag="h1">
      Editar Propiedad
    </v-card-title>
    <v-card-subtitle class="text-h5 text-center" tag="p">
      Cambia los datos de tu propiedad
    </v-card-subtitle>

    <v-form class="mt-10">
      <v-text-field
        v-model="name.value.value"
        :error-messages="name.errorMessage.value"
        label="Nombre"
        class="mb-5"
      ></v-text-field>

      <v-file-input
        v-model="image.value.value"
        :error-messages="image.errorMessage.value"
        accept="image/jpeg"
        prepend-icon="mdi-camera"
        label="Imagen"
        class="mb-5"
        @change="uploadImage"
      ></v-file-input>

      <div class="my-5">
        <p class="font-weight-bold">Imagen Actual:</p>
        <img
          v-if="imageUrl"
          class="w-50"
          :src="imageUrl"
          :alt="'Imagen de ' + property?.name"
        />
        <img
          v-else
          class="w-50"
          :src="property?.image"
          :alt="'Imagen de ' + property?.name"
        />
      </div>

      <v-text-field
        v-model="price.value.value"
        :error-messages="price.errorMessage.value"
        label="Precio"
        class="mb-5"
      ></v-text-field>

      <v-row>
        <v-col cols="12" md="4">
          <v-select
            label="Habitaciones"
            class="mb-5"
            :items="items"
            v-model="rooms.value.value"
            :error-messages="rooms.errorMessage.value"
          />
        </v-col>

        <v-col cols="12" md="4">
          <v-select
            label="Baños"
            class="mb-5"
            :items="items"
            v-model="bathrooms.value.value"
            :error-messages="bathrooms.errorMessage.value"
          />
        </v-col>

        <v-col cols="12" md="4">
          <v-select
            label="Estacionamientos"
            class="mb-5"
            :items="items"
            v-model="parkings.value.value"
            :error-messages="parkings.errorMessage.value"
          />
        </v-col>
      </v-row>

      <v-textarea
        v-model="description.value.value"
        :error-messages="description.errorMessage.value"
        label="Descripción"
        class="mb-5"
      ></v-textarea>

      <v-checkbox v-model="pool.value.value" label="Piscina"></v-checkbox>

      <h2 class="font-weight-bold text-center my-5">Ubicación</h2>
      <div class="pb-10">
        <div style="height: 600px">
          <LMap
            v-model:zoom="zoom"
            :center="center"
            :use-global-leaflet="false"
          >
            <LMarker :lat-lng="center" draggable @moveend="pin" />
            <LTileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            ></LTileLayer>
          </LMap>
        </div>
      </div>

      <v-btn color="pink-accent-3" block @click="submit">
        Guardar Cambios
      </v-btn>
    </v-form>
  </v-card>
</template>
