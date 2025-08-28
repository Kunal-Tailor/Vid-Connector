let IS_PROD = true;
const server = 
IS_PROD ?
    "https://vid-connector-3.onrender.com" :

    "http://localhost:8001"


export default server;