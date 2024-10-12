import axios from "axios";

export type TCharacter = {
  allies: string[];
  createdAt: string;
  enemies: string[];
  films: string[];
  imageUrl: string;
  name: string;
  parkAttractions: string[];
  shortFilms: string[];
  sourceUrl: string;
  tvShows: string[];
  updatedAt: string;
  url: string;
  videoGames: string[];
  _id: number;
  _v: number;
};

type TPagination = {
  count: number;
  nextPage: string | null;
  previousPage: string | null;
  totalPages: number;
};

const baseURL = "https://api.disneyapi.dev";

const disneyAPI = axios.create({ baseURL });

type TValue = number | string | boolean;

export const getDisneyCharacters = (
  params: { [x: string]: TValue } | null = null,
) => {
  return disneyAPI.get<{ info: TPagination; data: TCharacter[] }>(
    "/character",
    {
      params: { ...(params ? params : {}) },
    },
  );
};

export const getDisneyCharacter = (id: number | string) => {
  return disneyAPI.get<{ info: TPagination; data: TCharacter }>(
    `/character/${id}`,
  );
};
