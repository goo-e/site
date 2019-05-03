import axios from "axios";

const userFunctions = {
  addUser: (userData, config) => {
    axios.post("/api/user", userData, config).then(res => {
      const token = res.data.token;
      localStorage.setItem("token", token);
    });
  },
  checkUser: (email, config) => {
    axios.post("/api/auth", email, config).then(res => {
      const token = res.data.token;
      localStorage.setItem("token", token);
    });
  }
  //update user
  //- password
  //- email
  //- query prefs
  //delete user
};

export default userFunctions;
