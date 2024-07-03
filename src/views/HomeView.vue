<script setup>
import useProperties from "@/composables/useProperties";
import Property from "../components/Property.vue";
import { priceProperty } from "../helpers";

const { pool, propertiesFiltered } = useProperties();
</script>

<template>
  <h1 class="text-center text-h3 font-weight-bold my-10">
    Nuestras Propiedades
  </h1>
  <v-card flat class="py-10">
    <v-card-title class="text-h5">
      Búsqueda:
      <v-checkbox label="Con piscina" v-model="pool" />
    </v-card-title>
    <v-row>
      <Property
        v-for="property in propertiesFiltered"
        :key="property.id"
        :property="property"
        :priceProperty="priceProperty"
      />
    </v-row>
  </v-card>
</template>
