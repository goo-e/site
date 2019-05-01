import axios from "axios";

const userFunctions = {
  addUser: (userData, config) => {
    axios.post("/api/user", userData, config).then(data => {
      console.log(data);
    });
  },
  getUser: id => axios.get(`/api/users/${id}`)
  //update user
  //- password
  //- email
  //- query prefs
  //delete user
};

export default userFunctions;
