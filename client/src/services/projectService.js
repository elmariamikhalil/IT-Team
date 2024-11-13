import axios from "axios";

const API_URL = "http://localhost:5000/api/projects";

export const fetchProjects = async (token) => {
  return axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createProject = async (data, token) => {
  return axios.post(API_URL, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateProject = async (id, data, token) => {
  return axios.put(`${API_URL}/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteProject = async (id, token) => {
  return axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};