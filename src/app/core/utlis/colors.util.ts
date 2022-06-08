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


  static toRGBA(d) {
    const l = d.length;
    const rgba = {};
    if (d.slice(0, 3).toLowerCase() === 'rgb') {
      d = d.replace(' ', '').split(',');
      rgba[0] = parseInt(d[0].slice(d[3].toLowerCase() === 'a' ? 5 : 4), 10);
      rgba[1] = parseInt(d[1], 10);
      rgba[2] = parseInt(d[2], 10);
      rgba[3] = d[3] ? parseFloat(d[3]) : -1;
    } else {
      if (l < 6) {
        d = parseInt(String(d[1]) + d[1] + d[2] + d[2] + d[3] + d[3] + (l > 4 ? String(d[4]) + d[4] : ''), 16);
      }
      else {
        d = parseInt(d.slice(1), 16);
      }
      rgba[0] = (d >> 16) & 255;
      rgba[1] = (d >> 8) & 255;
      rgba[2] = d & 255;
      rgba[3] = l === 9 || l === 5 ? Math.round((((d >> 24) & 255) / 255) * 10000) / 10000 : -1;
    }
    return rgba;
  }

  static blend(from, to, p = 0.5) {
    from = from.trim();
    to = to.trim();
    const b = p < 0;
    p = b ? p * -1 : p;
    const f = ColorUtil.toRGBA(from);
    const t = ColorUtil.toRGBA(to);
    if (to[0] === 'r') {
      const roundedTo = t[3] < 0 ? f[3] : t[3];
      const roundedFrom = f[3] > -1 && t[3] > -1 ? Math.round((((t[3] - f[3]) * p) + f[3]) * 10000) / 10000 : roundedTo;
      return 'rgb' + (to[3] === 'a' ? 'a(' : '(') +
        Math.round(((t[0] - f[0]) * p) + f[0]) + ',' +
        Math.round(((t[1] - f[1]) * p) + f[1]) + ',' +
        Math.round(((t[2] - f[2]) * p) + f[2]) + (
          f[3] < 0 && t[3] < 0 ? '' : ',' + (
            roundedFrom
          )
        ) + ')';
    }

    const roundedTo2 = f[3] > -1 ? Math.round(f[3] * 255) : 255;
    const roundFrom2 = t[3] > -1 ? Math.round(t[3] * 255) : roundedTo2;
    return '#' + (0x100000000 + ((
      f[3] > -1 && t[3] > -1
        ? Math.round((((t[3] - f[3]) * p) + f[3]) * 255)
        : roundFrom2
    ) * 0x1000000) +
      (Math.round(((t[0] - f[0]) * p) + f[0]) * 0x10000) +
      (Math.round(((t[1] - f[1]) * p) + f[1]) * 0x100) +
      Math.round(((t[2] - f[2]) * p) + f[2])
    ).toString(16).slice(f[3] > -1 || t[3] > -1 ? 1 : 3);
  }
}
