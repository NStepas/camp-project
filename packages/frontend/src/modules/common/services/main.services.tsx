import axios from 'axios';
import { STORAGE_KEYS } from '../constants/app-keys.const';

export const mainApi = axios.create({
  baseURL: process.env.REACT_APP_MAIN_API
});

mainApi.defaults.headers.common['Content-Type'] = 'application/json';
export const localStorageUserData = localStorage.getItem(STORAGE_KEYS.USER_ADDRESS) || '{}';
