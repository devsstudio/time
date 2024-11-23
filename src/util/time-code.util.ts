import { Big } from 'big.js';

export class TimeCodeUtil {

  static DIGITS = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

  private static _changeBase10toN = (number: number, base = 62) => {
    if (base > 62) {
      throw new Error("The limit is 62 basis");
    } else {
      var code = "";

      while (number >= base) {
        code = TimeCodeUtil.DIGITS.charAt(number % base) + code;
        number = Math.floor(number / base);
      }

      code = TimeCodeUtil.DIGITS.charAt(number) + code;

      return code;
    }
  };

  static getTimeCode = (upper = false, useNanoseconds = true): string => {
    const epochMilliseconds = Date.now(); // Milisegundos desde Epoch (1970-01-01T00:00:00Z)
    const highResolutionTime = performance.now(); // Precisión alta (pero relativa al inicio de la página)

    // Calcular una aproximación de nanosegundos desde el Epoch
    const nanosecondsSinceEpoch = new Big(epochMilliseconds).times(1_000_000).plus(highResolutionTime * 1_000);
    const timestamp = useNanoseconds ? nanosecondsSinceEpoch : nanosecondsSinceEpoch.div(1_000_000);

    const full36 = this._changeBase10toN(timestamp.toNumber(), 36);

    return upper ? full36.toUpperCase() : full36;
  };

}
