import React from "react";
import { fetcher, ACCESS_TOKEN_KEY } from "./contant";
import EncryptedStorage from "react-native-encrypted-storage";

const useAuth = () => {
  const [isLoggedin, setLoggedIn] = React.useState(false);
  const [access_token, setAccessToken] = React.useState(null);
  React.useEffect(() => {
    async function isUserLoggedIn() {
      const token = await EncryptedStorage.getItem(ACCESS_TOKEN_KEY);
      if (token) {
        setLoggedIn(true);
        setAccessToken(token);
      } else {
        setLoggedIn(false);
        setAccessToken(null);
      }
    }
    isUserLoggedIn();
  }, [isLoggedin]);

  return [isLoggedin, access_token];
};

const register = (user, callback) => {
  let formdata = new FormData();
  formdata.append("username", user.name);
  formdata.append("email", null); // can be null
  formdata.append("password", user.password);
  formdata.append("phoneNo", user.phoneNo);
  formdata.append("avatar", null); // can be null
  formdata.append("phoneNoVerfication", user.isVerify);

  const res = fetcher("user/register", {
    method: "POST",
    body: formdata,
  });
  res.then(async (response) => {
    console.log(response);
    if (response.data) {
      await EncryptedStorage.setItem(ACCESS_TOKEN_KEY, response.access_token);
      callback({
        isRegisterd: true,
        data: response.data,
      });
    } else {
      callback({
        isRegisterd: false,
        data: response,
      });
    }
  });

  res.catch((err) => {
    callback({
      isRegisterd: false,
      data: err,
    });
  });
};
const login = (user, callback) => {
  let formdata = new FormData();
  formdata.append("phoneNo", user.phoneNo);
  formdata.append("password", user.password);
  fetcher("user/login", {
    method: "POST",
    body: formdata,
  })
    .then(async (res) => {
      console.log(res);
      if (res.access_token) {
        await EncryptedStorage.setItem(ACCESS_TOKEN_KEY, res.access_token);
        callback({
          isRegisterd: true,
          data: res.message,
        });
      } else {
        callback({
          isRegisterd: false,
          data: res.message,
        });
      }
    })
    .catch((err) => {
      callback({
        isRegisterd: false,
        data: err,
      });
    });
};
async function logOut(callback) {
  const access_token = await retrieveUserSession();
  if (access_token) {
    console.log("Loging Out ......" + access_token);
    fetcher("user/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access_token}`,
        Accept: "application/json",
      },
    }).then(async (res) => {
      await EncryptedStorage.removeItem(ACCESS_TOKEN_KEY);
      callback(res);
    });
  }
}

async function retrieveUserSession() {
  try {
    const session = await EncryptedStorage.getItem(ACCESS_TOKEN_KEY);

    if (session !== undefined) {
      return session;
    }
    return null;
  } catch (error) {
    // There was an error on the native side
    return null;
  }
}
export { register, useAuth, retrieveUserSession, login, logOut };
