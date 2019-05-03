import axios from "axios";
import Cookies from "universal-cookie";

const userFunctions = {
  addUser: (userData, config) => {
    axios.post("/api/user", userData, config).then(res => {
      const token = res.data.token;
      const cookies = new Cookies();
      cookies.set("token", token);
    });
  },
  checkUser: (email, config) => {
    axios.post("/api/auth", email, config).then(res => {
      const token = res.data.token;
      const cookies = new Cookies();
      cookies.set("token", token);
    });
  }
  //update user
  //- password
  //- email
  //- query prefs
  //delete user
};

export default userFunctions;
