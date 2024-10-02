import { atom } from 'recoil';


export const authState = atom<null | true>({
  key: 'auth', 
  default: null, 
});