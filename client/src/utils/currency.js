import numeral from 'numeral';


export default function currency(num, currencyCode) {
  // int currency code
  if (currencyCode === '¥') {
    return currencyCode + numeral(num).format('0,0');
  }
  return currencyCode + numeral(num).format('0,0.00');
}
