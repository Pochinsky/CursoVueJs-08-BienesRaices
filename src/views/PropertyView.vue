<script setup>
import { watch } from "vue";
import { useRoute } from "vue-router";
import { LMap, LTileLayer, LMarker, LPopup } from "@vue-leaflet/vue-leaflet";
import { doc } from "firebase/firestore";
import { useDocument, useFirestore } from "vuefire";
import useLocationMap from "../composables/useLocationMap";
import { priceProperty } from "../helpers";
import "leaflet/dist/leaflet.css";

const route = useRoute();
const db = useFirestore();
const docRef = doc(db, "properties", route.params.id);
const property = useDocument(docRef);
const { zoom, center } = useLocationMap();

watch(property, (property) => {
  center.value = property.ubication;
});
</script>

<template>
  <v-card flat>
    <v-card-title class="mt-5 text-h3 text-center font-weight-bold" tag="h1">
      {{ property?.name }}
    </v-card-title>
    <v-img :src="property?.image" height="512" cover />
    <div class="bg-blue-grey-lighten-5 d-flex flex-column flex-md-row">
      <v-card-text tag="p">
        Precio:
        <span class="font-weight-bold">
          {{ priceProperty(property?.price) }}
        </span>
      </v-card-text>
      <v-card-text tag="p">
        Habitaciones:
        <span class="font-weight-bold">{{ property?.rooms }}</span>
      </v-card-text>
      <v-card-text tag="p">
        Baños:
        <span class="font-weight-bold">{{ property?.bathrooms }}</span>
      </v-card-text>
      <v-card-text tag="p">
        Estacionamientos:
        <span class="font-weight-bold">{{ property?.parkings }}</span>
      </v-card-text>
    </div>
    <v-row>
      <v-col cols="12" md="8">
        <div class="text-pre-wrap py-10">
          {{ property?.description }}
        </div>
      </v-col>
      <v-col cols="12" md="4">
        <div class="py-10" style="height: 512px">
          <LMap
            v-model:zoom="zoom"
            :center="center"
            :use-global-leaflet="false"
          >
            <LMarker :lat-lng="center">
              <LPopup>{{ property.name }}</LPopup>
            </LMarker>
            <LTileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            ></LTileLayer>
          </LMap>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<style>
.text-pre-wrap {
  white-space: pre-wrap;
}
</style>
