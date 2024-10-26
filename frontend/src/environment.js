let IS_PROD = false;
const server = IS_PROD ?
    "https://price-trackerbackend.onrender.com" :

    "http://localhost:5000"


export default server;