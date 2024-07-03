export const validationSchema = {
  name(value) {
    if (value?.length >= 6) return true;
    return "El nombre de la propiedad es obligatorio y debe tener, al menos, 6 caracteres";
  },
  price(value) {
    const regex = /^[0-9]+$/;
    if (regex.test(value)) return true;
    return "El precio solo deben tener números";
  },
  rooms(value) {
    if (value) return true;
    return "Selecciona una cantidad";
  },
  bathrooms(value) {
    if (value) return true;
    return "Selecciona una cantidad";
  },
  parkings(value) {
    if (value) return true;
    return "Selecciona una cantidad";
  },
  description(value) {
    if (value) return true;
    return "Agrega una descripción";
  },
};

export const imageSchema = {
  image(value) {
    if (value) return true;
    return "La imagen es obligatoria";
  },
};
