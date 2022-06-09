import { normal } from 'color-blend';

export const HEX_COLOR_PATTERN = '^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$';

/*eslint no-bitwise: ["error", { "allow": [">>", "<<", "&"] }] */
export class ColorUtil {

  public static randomColor(): string {
    return `#${Math.floor(Math.random() * (0xffffff + 1)).toString(16).padStart(6, '0')}`;
  }

  public static stringToColour(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let colour = '#';
    for (let j = 0; j < 3; j++) {
      const value = (hash >> (j * 8)) & 0xFF;
      colour += (value.toString(16));
    }
    return colour;
  }

  public static convertToRGB(hex) {
    hex = hex.replace('#', '');
    if (hex.length !== 6) {
      throw Error('Only six-digit hex colors are allowed.');
    }
    const aRgbHex = hex.match(/.{1,2}/g);

    return {
      r: parseInt(aRgbHex[0], 16),
      g: parseInt(aRgbHex[1], 16),
      b: parseInt(aRgbHex[2], 16),
      a: 0.5
    };
  }

  static blend(from, to) {

    const f = ColorUtil.convertToRGB(from);
    const t = ColorUtil.convertToRGB(to);
    const blendedColor = normal(f, t);

    return ColorUtil.fullColorHex(blendedColor.r, blendedColor.g, blendedColor.b);
  }

  static fullColorHex(r, g, b) {
    return `#${ColorUtil.rgbToHex(r) + ColorUtil.rgbToHex(g) + ColorUtil.rgbToHex(b)}`;
  }

  static rgbToHex(rgb) {
    let hex = Number(rgb).toString(16);
    if (hex.length < 2) {
      hex = `0${hex}`;
    }
    return hex;
  }
}
