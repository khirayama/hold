import numeral from 'numeral';


export default function currency(num, currencyCode) {
  // int currency code
  if (currencyCode === '¥') {
    return currencyCode + numeral(num).format('0,0');
  } else {
    return currencyCode + numeral(num).format('0,0.00');
  }
}
