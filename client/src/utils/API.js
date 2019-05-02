import axios from "axios";

const userFunctions = {
  addUser: (userData, config) => {
    axios.post("/api/user", userData, config).then(res => {
      console.log(res.data);
    });
  },
  checkUser: (email, config) => {
    axios.post("/api/auth", email, config).then(res => {
      console.log(res.data);
    });
  }
  //update user
  //- password
  //- email
  //- query prefs
  //delete user
};

export default userFunctions;
