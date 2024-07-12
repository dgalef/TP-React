const API = "https://v3.football.api-sports.io"
//const cacheKey = 'api_fixture';
const cacheTTL = 3600 * 1000; // Tiempo de vida del caché en milisegundos (1 hora)

const fetchFromApi = async (path) => {
    const response = await fetch(API + path, {
        headers: {
            'x-rapidapi-key': 'e802866635be846647badd14e1819ca5',   // Esta API key tiene un limite diario de 100 consultas
            'x-rapidapi-host': 'v3.football.api-sports.io'
        }
    });
    const data = await response.json();
    return data;
};

const readCache = (key) => {
    const cachedData = localStorage.getItem(key);
    if (!cachedData) return null;

    const { data, timestamp } = JSON.parse(cachedData);
    if ((Date.now() - timestamp) > cacheTTL) {
        localStorage.removeItem(key);
        return null;
    }
    return data;
};

const writeCache = (key, data) => {
    const cacheData = {
      data,
      timestamp: Date.now(),
    };
    localStorage.setItem(key, JSON.stringify(cacheData));
  };


export const getData = async (path, cacheKey) => {
    const cachedData = readCache(cacheKey);

    if (cachedData) {
        return cachedData;
    } else {
        const fetchedData = await fetchFromApi(path);
        writeCache(cacheKey, fetchedData);
        return fetchedData;
    }
};


// Leti 6c3618a24b636f39602d1687d6621a68
// Ale e802866635be846647badd14e1819ca5
// Emma a90c31bc19220e658bbc24277864b411
// Germán abf0415bcf670229015a3366310905e1
