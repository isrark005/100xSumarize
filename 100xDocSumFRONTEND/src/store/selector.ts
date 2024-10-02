import { selector } from 'recoil';
import { authState } from './atom';


export const isKiratState = selector({
  key: 'isKiratState',
  get: ({ get }) => {
    return get(authState); 
  },
});
