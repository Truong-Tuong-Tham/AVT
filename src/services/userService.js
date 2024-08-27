import { https } from "./urlConfig";

export const userService = {
  postLogin: (value) => {
    let uri = "/api/auth/signin";
    return https.post(uri, value);
  },

  postRegister: (values) => {
    let uri = "/api/auth/signup";
    let promise = https.post(uri, values);
    return promise;
  },
  putInfoUser: (values, id) => {
    const uri = `/api/users/${id}`;
    return https.put(uri, values);
  },

  getUserID: (id) => {
    let uri = `/api/users/${id}`;
    return https.get(uri);
  },
  getListUser: () => {
    let uri = "/api/users";
    return https.get(uri);
  },
  deleteUser: (id) => {
    let uri = '/api/users?id='+id;
    return https.delete(uri);
  },
  postAvatar: (values) => {
    let uri = "/api/users/upload-avatar";
    return https.post(uri, values);
  },
  postUser: (values) => {
    let uri = "/api/users";
    return https.post(uri, values);
  },
};
