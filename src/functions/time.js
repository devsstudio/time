var moment = require("moment");
const nanotime = require("nano-time");

const _digits =
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

const _changeBase10toN = (number, base = 62) => {
  if (base > 62) {
    throw new Exception("The limit is 62 basis");
  } else {
    var code = "";

    while (number >= base) {
      code = _digits.charAt(number % base) + code;
      number = Math.floor(number / base);
    }

    code = _digits.charAt(number) + code;

    return code;
  }
};

exports.getTimeCode = (upper = false) => {
  const nanofull = nanotime().toString();

  //const datepart = moment().format("YYYYMMDDHHmmss");
  //const nanopart = nanofull.substring(nanofull.length - 7);

  //const date36 = _changeBase10toN(datepart, 36);
  //const micro36 = _changeBase10toN(nanopart, 36);
  const full36 = _changeBase10toN(nanofull, 36);

  //console.log(nanofull, datepart, nanopart, date36, micro36, full36);

  if (upper) {
    //return (date36 + micro36).toUpperCase();
    return full36.toUpperCase();
  } else {
    //return date36 + micro36;
    return full36;
  }
};
