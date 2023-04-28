import { createContext } from 'react';
import { createContextualCan } from '@casl/react';

export const AbilityContext = createContext(); // Context APIdaki uygulama genelinde yetki yöntemini global olarak tüm componentlerde kullanabilmek için bir context tanımı yaptık.
export const Can = createContextualCan(AbilityContext.Consumer); // casl/react ile context api birlikte çalışabilmesi için tanımlanmış bir Context yapısı.
