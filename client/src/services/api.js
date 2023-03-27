import { BASE_URL } from "../utils";
import { create, get, update } from "./http.service";

// URLs
const TUTORIALS_URL = `${BASE_URL}/tutorials/`;
const TUTORIALS_URL_BY_ID = (ID) => `${BASE_URL}/tutorials/${ID}`;

// API's METHODs
export const getTutorialsApi = async () => {
  return get(TUTORIALS_URL);
};

export const createTutorialsApi = async (payload) => {
  return create(TUTORIALS_URL, payload);
};

export const updateTutorialsApi = async (payload, id) => {
  return create(TUTORIALS_URL_BY_ID(id), payload);
};

export const getTutorialByIDApi = async (id) => {
  return get(TUTORIALS_URL_BY_ID(id));
};
