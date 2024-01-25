import axios, { AxiosRequestConfig } from "axios";
 export const API_BASE_URL = 'https://app.emitrasevakendra.com/api/';

export const apiRequest = axios.create({
  baseURL: `${API_BASE_URL}`,
  timeout: 30000,
  headers: {
    "x-app": "e-mitra-react-web-app",
    "Accept" : "application/json; charset=utf-8",
  },
});

// apiRequest.interceptors.request.use((config) => {
// //   const userContext = getUserContext();
// //   const { token, academicYear, customerId, financialYear } = parse(userContext);
// //   const institute = selectActiveInstitute();

//   if (config.headers) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export const get = (url: string) => apiRequest.get(url);
export const post = (url: string, data: unknown) => apiRequest.post(url, data);
export const put = (url: string, data: unknown) => apiRequest.put(url, data);
export const remove = (
  url: string,
  data?: AxiosRequestConfig<any> | undefined
) => apiRequest.delete(url, data);
