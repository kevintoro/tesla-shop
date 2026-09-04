const currencyFormatter = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  minimumFractionDigits: 2,
});

export const formatCurrency = (value: number) => {
  return currencyFormatter.format(value);
};
