import { EUnicornGender } from '../enums/unicorn-gender.enum';
import { Unicorn } from './unicorn.model';

export class UnicornMock {
    static unicornMockObjSerialized: Partial<Unicorn> = {
        name: 'test',
        age: 18,
        color: '#0000000',
        gender: EUnicornGender.male
    };

    static unicornMockObj: Unicorn = new Unicorn(UnicornMock.unicornMockObjSerialized);
}
