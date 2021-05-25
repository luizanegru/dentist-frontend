import axios from "axios";

const API_PROFILE = "http://localhost:8080/profile/";

class ProfileService {
  profile(username){
        return axios
        .get(API_PROFILE + "showPatient", {
            params: {username }
        })
        .then(response => {
            return JSON.parse(response.data)
        });
    }

}

export default new ProfileService();