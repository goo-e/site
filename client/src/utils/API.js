import axios from "axios";

export default {
    addUser: userData => axios.post("/api/users", userData),
    getUser: id => axios.get(`/api/users/${id}`)
    //update user 
    //- password
    //- email
    //- query prefs
    //delete user
}