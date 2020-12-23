import Constants from "../utils/Constants";
import HttpHelper from "../utils/HttpHelperUtil";

const { Routes } = Constants.URLS.apis;

function getAsteroid(asteroidId) {
  return  HttpHelper.get(asteroidId).then(({ name, nasa_jpl_url, is_potentially_hazardous_asteroid }) => ({ name, nasa_jpl_url, is_potentially_hazardous_asteroid }));
};

function getRandomAsteroid() {
  return  HttpHelper.get('browse').then(data => {
    const { near_earth_objects: asteroids } = data;
    const { name, nasa_jpl_url, is_potentially_hazardous_asteroid } = asteroids[Math.floor(Math.random() * asteroids.length)];
    return { name, nasa_jpl_url, is_potentially_hazardous_asteroid };
  });
};


export const asteroidService = {
  getAsteroid,
  getRandomAsteroid
};
