import numeral from 'numeral';


export default function currency(num, currencyCode, isFloat) {
  if (isFloat) {
    return currencyCode + numeral(num).format('0,0');
  }
  return currencyCode + numeral(num).format('0,0.00');
}
