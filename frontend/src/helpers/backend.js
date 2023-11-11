import axios from 'axios';

const axiosApi = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

const rawToken = JSON.parse(localStorage.getItem('user'))?.token;
axiosApi.defaults.headers.common['Authorization'] = rawToken
  ? `Bearer ${rawToken}`
  : '';

const refreshToken = (axios) => {
  const rawToken = JSON.parse(localStorage.getItem('user'))?.token;
  axios.defaults.headers.common['Authorization'] = rawToken
    ? `Bearer ${rawToken}`
    : '';
};

export const post = async (url, body) => {
  refreshToken(axiosApi);
  const response = await axiosApi.post(url, { ...body });
  return response.data.user;
};

export const get = async (url, body) => {
  refreshToken(axiosApi);
  const response = await axiosApi.get(url, { ...body });
  return response.data.result;
};

{
  /*
export const post = async (url) => {
  refreshToken(axiosApi);
  try {
    const response = await axiosApi.post(url, {
      data: { emailTo: 'zacks.haruna@gmail.com' },
    });
    return response.data.user;
  } catch (error) {
    console.log(error);
  }
};
*/
}
