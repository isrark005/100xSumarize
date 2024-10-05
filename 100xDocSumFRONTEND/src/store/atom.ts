import { atom } from 'recoil';


export const authState = atom<null | true>({
  key: 'auth', 
  default: null, 
});

export const submissionFlagState = atom<boolean>({
  key: 'submissionFlag', 
  default: false, 
});