import numeral from 'numeral';

export function amount(num, currencyCode) {
  if (currencyCode === 'JPY') {
    return numeral(num).format('0,0');
  }
  return numeral(num).format('0,0.00');
}

export default function currency(num, currencyCode = '') {
  return currencyCode + amount(num, currencyCode);
}
