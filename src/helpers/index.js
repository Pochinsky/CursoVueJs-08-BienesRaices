export const priceProperty = (price) =>
  Number(price).toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
  });
