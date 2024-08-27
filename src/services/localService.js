export const userLocal = {
    set: (infoUser) => {
      let json = JSON.stringify(infoUser);
      localStorage.setItem("USER_INFO", json);
    },
    get: () => {
      let jsonUserInfo = localStorage.getItem("USER_INFO");
      if (jsonUserInfo) {
        return JSON.parse(jsonUserInfo);
      } else {
        return null;
      }
    },
    remove: () => {
      localStorage.removeItem("USER_INFO");
    },
 
  };
  export const jobLocal = {
    set: (listJobs) => {
      let json = JSON.stringify(listJobs);
      localStorage.setItem("JOB_INFO", json);
    },
    get: () => {
      let jsonUserInfo = localStorage.getItem("JOB_INFO");
      if (jsonUserInfo) {
        return JSON.parse(jsonUserInfo);
      } else {
        return null;
      }
    },
    remove: () => {
      localStorage.removeItem("JOB_INFO");
    },
 
  };
  export const avaLocal = {
    set: (avatar) => {
      let json = JSON.stringify(avatar);
      localStorage.setItem("AVA_INFO", json);
    },
    get: () => {
      let jsonUserInfo = localStorage.getItem("AVA_INFO");
      if (jsonUserInfo) {
        return JSON.parse(jsonUserInfo);
      } else {
        return null;
      }
    },
    remove: () => {
      localStorage.removeItem("AVA_INFO");
    },
 
  };