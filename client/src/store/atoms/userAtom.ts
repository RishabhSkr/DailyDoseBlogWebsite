
import { atom } from 'recoil';

export const userAtomState = atom({
  key: 'userState',
  default: {
    isLoggedIn: false,
    username: ''
  }
});