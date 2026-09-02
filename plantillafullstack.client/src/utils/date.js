export const formatDateForInput = (date) => { // Recibo una fecha
  if (!date) return "";
  return new Date(date).toISOString().split("T")[0]; // Corto el string a partir de la T
};