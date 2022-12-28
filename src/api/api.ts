import Axios, { AxiosError, AxiosResponse } from "axios";

const customAxios = Axios.create({
  baseURL: "https://todo.api.devcode.gethired.id",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const responseHandler = (response: AxiosResponse) => {
  return response;
};

const errorHandler = (error: AxiosError) => {
  return Promise.reject(error);
};

// ** Response Intercept
customAxios.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error)
);

export default customAxios;
