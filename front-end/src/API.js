import axios from 'axios';

const API = axios.create({
  baseURL: 'https://6hgqu0b2te.execute-api.eu-west-2.amazonaws.com/dev/',
});

export default API;
