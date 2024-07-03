<script setup>
import { useForm, useField } from "vee-validate";
import { loginSchema as validationSchema } from "../validation/loginSchema";
import { useAuthStore } from "../stores/auth";

const { handleSubmit } = useForm({ validationSchema });
const authStore = useAuthStore();
const email = useField("email");
const password = useField("password");

const submit = handleSubmit((values) => {
  authStore.login(values);
});
</script>

<template>
  <v-card flat max-width="600" class="mx-auto my-5">
    <v-card-title class="text-center text-h3 font-weight-bold" tag="h1"
      >Iniciar Sesión</v-card-title
    >
    <v-card-subtitle class="text-h5 text-center"
      >Ingresa los datos de tu cuenta</v-card-subtitle
    >
    <v-alert
      v-if="authStore.hasError"
      class="my-5"
      type="error"
      :title="authStore.errorMessage"
    ></v-alert>
    <v-form class="mt-5">
      <v-text-field
        type="email"
        label="Email"
        bg-color="blue-grey-lighten-5"
        class="mb-4"
        v-model="email.value.value"
        :error-messages="email.errorMessage.value"
      />
      <v-text-field
        type="password"
        label="Contraseña"
        bg-color="blue-grey-lighten-5"
        class="mb-4"
        v-model="password.value.value"
        :error-messages="password.errorMessage.value"
      />
      <v-btn block color="pink-accent-3" @click="submit">Iniciar Sesión</v-btn>
    </v-form>
  </v-card>
</template>
