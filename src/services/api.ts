import axios from "axios";
import config from "../config";

export const LOCALSTORAGE_KEY = 'pokemon_favorites';

export const sendGetRequest = async (url: string) => {
  return axios.get(`${config.BASE_API_URL}${url}`);
};

