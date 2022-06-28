import axios from "axios";

export async function loginUser(email, password) {
  let callback = await axios({
    withCredentials: true,
    method: "post",
    url: "http://localhost:3000/api/users/login",
    data: {
      email: email,
      password: password,
    },
  });

  return callback.data;
}

export async function registerUser(email, name, password) {
  let callback = await axios({
    method: "post",
    withCredentials: true,
    url: "http://localhost:3000/api/users/create_user",
    data: {
      firstname: name.substring(0, name.indexOf(" ")),
      lastname: name.substring(name.indexOf(" ") + 1),
      email: email,
      password: password,
    },
  });

  return callback.data;
}

export async function getLoggedInUser() {
  let callback = await axios({
    withCredentials: true,
    method: "get",
    url: "http://localhost:3000/api/users/check_login",
  });

  return callback.data;
}
