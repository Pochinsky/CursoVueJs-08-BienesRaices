<script setup>
import { useForm, useField } from "vee-validate";
import { collection, addDoc, doc } from "firebase/firestore";
import { useFirestore } from "vuefire";
import { useRouter } from "vue-router";
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";
import { validationSchema, imageSchema } from "@/validation/propertySchema";
import useImage from "@/composables/useImage";
import useLocationMap from "@/composables/useLocationMap";
import "leaflet/dist/leaflet.css";

const items = [1, 2, 3, 4, 5];

const { url, imageUrl, uploadImage } = useImage();
const { zoom, center, pin } = useLocationMap();
const router = useRouter();
const db = useFirestore();
const { handleSubmit } = useForm({
  validationSchema: { ...validationSchema, ...imageSchema },
});

const name = useField("name");
const image = useField("image");
const price = useField("price");
const rooms = useField("rooms");
const bathrooms = useField("bathrooms");
const parkings = useField("parkings");
const description = useField("description");
const pool = useField("pool", null, { initialValue: false });

const submit = handleSubmit(async (values) => {
  const { image, ...property } = values;
  const docRef = await addDoc(collection(db, "properties"), {
    ...property,
    image: url.value,
    ubication: center.value,
  });
  if (docRef.id) router.push({ name: "properties" });
});
</script>

<template>
  <v-card max-width="800" flat class="mx-auto">
    <v-card-title class="text-center text-h3 font-weight-bold" tag="h1"
      >Nueva Propiedad</v-card-title
    >
    <v-card-subtitle class="text-h5 text-center" tag="p">
      Ingresa los datos de tu nueva propiedad
    </v-card-subtitle>
    <v-form class="mt-10">
      <v-text-field
        class="mb-4"
        label="Nombre"
        v-model="name.value.value"
        :error-messages="name.errorMessage.value"
      />
      <v-file-input
        class="mb-4"
        accept="image/jpeg"
        label="Imagen"
        prepend-icon="mdi-camera"
        v-model="image.value.value"
        :error-messages="image.errorMessage.value"
        @change="uploadImage"
      />
      <div v-if="imageUrl" class="my-5">
        <p class="font-weight-bold">Imagen Propiedad:</p>
        <img class="w-50" :src="imageUrl" alt="Imagen Propiedad" />
      </div>
      <v-text-field
        class="mb-4"
        label="Precio"
        v-model="price.value.value"
        :error-messages="price.errorMessage.value"
      />
      <v-row>
        <v-col cols="12" md="4">
          <v-select
            class="mb-4"
            label="N° de habitaciones"
            :items="items"
            v-model="rooms.value.value"
            :error-messages="rooms.errorMessage.value"
          />
        </v-col>
        <v-col cols="12" md="4">
          <v-select
            class="mb-4"
            label="N° de baños"
            :items="items"
            v-model="bathrooms.value.value"
            :error-messages="bathrooms.errorMessage.value"
          />
        </v-col>
        <v-col cols="12" md="4">
          <v-select
            class="mb-4"
            label="N° de estacionamientos"
            :items="items"
            v-model="parkings.value.value"
            :error-messages="parkings.errorMessage.value"
          />
        </v-col>
      </v-row>
      <v-textarea
        label="Descripción"
        v-model="description.value.value"
        :error-messages="description.errorMessage.value"
      ></v-textarea>
      <v-checkbox
        label="Piscina"
        v-model="pool.value.value"
        :error-messages="pool.errorMessage.value"
      />
      <h2 class="font-weight-bold text-center mb-5">Ubicación</h2>
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
      <v-btn color="pink-accent-3" block @click="submit"
        >Agregar Propiedad</v-btn
      >
    </v-form>
  </v-card>
</template>
