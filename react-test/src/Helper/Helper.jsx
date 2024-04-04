import axios from "axios";

const public_url = "http://localhost:8080";

export const userLogin = (user) => {
  console.log("in user login");
  const createUrl = `${public_url}/user/login`;

  return axios.post(createUrl, user);
};

export const userRegister = (user) => {
  console.log("in user register");
  const createUrl = `${public_url}/user/register`;

  return axios.post(createUrl, user);
};
