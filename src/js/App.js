import { historyList } from "./CitiesCard";
import { renderAllCards, toogleLoader } from "./utils";

const CORS_URL = "https://cors-anywhere-venky.herokuapp.com/";
const METAWEATHER_URL = 'https://www.metaweather.com/api/';

const URL = `${ CORS_URL }${METAWEATHER_URL}`;

const BASE_CITY = "london";
const citiesArr = [];

// GET DATA BY CITY
export const getDataByCity = async (val) => {
  
  toogleLoader(true);

  try {
    const response = await fetch(`${ URL }location/search/?query=${ val }`, {
      method: "GET",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();

      const { title, woeid } = data[0];
      citiesArr.push(title);

      getDataByWoeid(woeid);

    } else {
      throw new Error(`Http error: ${ response.status }`);
    }
    
  } catch (error) {
    console.log(error);
  } 
};

// GET DATA BY WOEID
export const getDataByWoeid = async (val) => {
  try {
    const response = await fetch(`${ URL }/location/${ val }/`);

    if(response.ok) {
      const data = await response.json();

      renderAllCards(data);
      historyList(citiesArr);
      toogleLoader(false);

    } else {
      throw new Error(`Http error: ${ response.status }`);
    }

  } catch (error) {
    console.log(error);
  }
};

// GET DATA BY GPS
export const getDataByGPS = async (lat, long) => {
  try {
    const response = await fetch(`${ URL }location/search/?lattlong=${ lat },${ long }`);

    if(response.ok) {
      const data = await response.json();
    
      const { title } = data[0];
      getDataByCity(woeid);

    } else {
      throw new Error(`Http error: ${ response.status }`);
    }

  } catch (error) {
    console.log(error);
  }
};

// GEOLOCATION
export const searchLocationByGPS = () => {
  if( 'geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition);
  } else {
    alert("Your browser doesn't support geolocation method!");
  }
};

const setPosition = (position) => {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;

  getDataByGPS(lat, long);
};

getDataByCity(BASE_CITY);