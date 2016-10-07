import numeral from 'numeral';


export default function currency(num, currencyCode) {
  if (currencyCode === 'JPY') {
    return currencyCode + numeral(num).format('0,0');
  }
  return currencyCode + numeral(num).format('0,0.00');
}
