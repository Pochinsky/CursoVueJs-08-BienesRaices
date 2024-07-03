<script setup>
defineProps({
  property: {
    type: Object,
  },
  priceProperty: {
    type: Function,
  },
});
</script>

<template>
  <v-col cols="12" md="4">
    <v-card>
      <v-img :src="property.image" height="256" cover />
      <v-card-title class="text-h5" tag="h2">{{ property.name }}</v-card-title>
      <v-card-text class="text-truncate" tag="p">{{
        property.description
      }}</v-card-text>
      <v-card-text class="text-h5 font-weight-bold" tag="p">
        Precio: {{ priceProperty(property.price) }}
      </v-card-text>
      <template v-slot:actions>
        <v-btn
          block
          color="info"
          variant="flat"
          :to="{ name: 'property', params: { id: property.id } }"
        >
          Ver Información
        </v-btn>
      </template>
    </v-card>
  </v-col>
</template>
