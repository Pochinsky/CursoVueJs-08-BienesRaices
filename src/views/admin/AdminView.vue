<script setup>
import useProperties from "@/composables/useProperties";

const { propertiesCollection, priceProperty } = useProperties();
</script>

<template>
  <h2 class="text-center text-h3 my-5 font-weight-bold">
    Panel de Administrador
  </h2>
  <v-btn color="blue" variant="flat" :to="{ name: 'new-property' }">
    Nueva Propiedad
  </v-btn>
  <v-card class="mx-auto mt-5" flat>
    <v-list>
      <v-list-item v-for="property in propertiesCollection" :key="property.id">
        <template v-slot:prepend>
          <v-list-item-media start="true">
            <img
              width="180"
              :src="property.image"
              :alt="'Imagen de ' + property.name"
            />
          </v-list-item-media>
        </template>
        <v-list-item-title>{{ property.name }}</v-list-item-title>
        <v-list-item-subtitle>{{
          priceProperty(property.price)
        }}</v-list-item-subtitle>
        <template v-slot:append>
          <v-list-item-media :start="true">
            <v-btn color="info" flat class="mr-3">Editar</v-btn>
            <v-btn color="red-darken-3" flat>Eliminar</v-btn>
          </v-list-item-media>
        </template>
      </v-list-item>
    </v-list>
  </v-card>
</template>
