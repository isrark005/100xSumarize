import { selector } from 'recoil';
import { authState, submissionFlagState } from './atom';


export const isKiratState = selector({
  key: 'isKiratState',
  get: ({ get }) => {
    return get(authState); 
  },
});

export const submissionFlagStateSelector = selector({
  key: 'submissionFlagStateSelector',
  get: ({ get }) => {
    return get(submissionFlagState); 
  },
});
