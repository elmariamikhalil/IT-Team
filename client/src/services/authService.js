import axios from "axios";

const API_URL = "http://localhost:5000/api/auth/";

export const register = async (data) => axios.post(API_URL + "register", data);
export const login = async (data) => axios.post(API_URL + "login", data);