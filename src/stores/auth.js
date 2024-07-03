import { ref, computed, onMounted } from "vue";
import { defineStore } from "pinia";
import { useFirebaseAuth } from "vuefire";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { useRouter } from "vue-router";

export const useAuthStore = defineStore("auth", () => {
  const errorMessage = ref("");
  const authUser = ref(null);

  const router = useRouter();
  const auth = useFirebaseAuth();

  const errorCodes = {
    "auth/invalid-credential":
      "Credenciales inválidas, revisa el correo y/o la contraseña",
  };

  onMounted(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        authUser.value = user;
      }
    });
  });

  function login({ email, password }) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        authUser.value = user;
        router.push({ name: "properties" });
      })
      .catch((error) => {
        console.log(error);
        errorMessage.value = errorCodes[error.code];
      });
  }

  function logout() {
    signOut(auth)
      .then(() => {
        authUser.value = null;
        router.push({ name: "login" });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const hasError = computed(() => {
    return errorMessage.value;
  });

  const isAuth = computed(() => {
    return authUser.value;
  });

  return { errorMessage, hasError, isAuth, login, logout };
});
