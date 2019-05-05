import axios from "axios";
import Cookies from "universal-cookie";

const userFunctions = {
  addUser: (userData, config) => {
    return axios.post("/api/user", userData, config);
  },
  checkUser: (email, config) => {
    return axios.post("/api/auth", email, config);
  }

  //update user
  //- password
  //- email
  //- query prefs
  //delete user
};

export default userFunctions;
