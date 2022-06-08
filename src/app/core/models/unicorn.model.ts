import { JsonProperty } from '@paddls/ts-serializer';
import { EUnicornGender } from '../enums/unicorn-gender.enum';

export class Unicorn {

  @JsonProperty()
  name: string;

  @JsonProperty()
  age: number;

  @JsonProperty()
  gender: EUnicornGender;

  @JsonProperty()
  color: string;

  public constructor(data: Partial<Unicorn> = {}) {
    Object.assign(this, data);
  }

  canMakeABabyWith(partnair: Unicorn): boolean {
    return (this.gender === EUnicornGender.male && partnair.gender === EUnicornGender.female // https://www.youtube.com/watch?v=NiDkzQgrQIw
      || this.gender === EUnicornGender.female && partnair.gender === EUnicornGender.male) && // https://www.youtube.com/watch?v=OfFPtvX4xpQ
      (this.age >= 18 && partnair.age >= 18); //https://fr.m.wikipedia.org/wiki/Fichier:PEGI_18_annotated_%282009-2010%29.png
  }
}
