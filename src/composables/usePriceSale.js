export default function usePriceSale(origin_price, discount_type, discount) {
  const origin = Number(origin_price);

  if (discount_type === "%") {
    return origin - origin * discount / 100;
  }

  let result = origin - discount;
  return result > 0 ? result : 0;
}