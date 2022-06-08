
export class EnumUtil {
  static randomEnumKey(enumeration) {
    const keys = Object.keys(enumeration)
      .filter(k => !(Math.abs(Number.parseInt(k, 10)) + 1));
    return keys[Math.floor(Math.random() * keys.length)];
  }
}
