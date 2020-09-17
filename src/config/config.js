const port = 3000;
const baseURL = `http://localhost:${port}/`;
const apiBase = `http://localhost:9000/`;
module.exports = {
    // The secret for the encryption of the jsonwebtoken
    JWTsecret: 'mysecret',
    baseURL: baseURL,
    port: port,
    apiBase:apiBase
};
