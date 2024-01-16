import api from "./api.service";
import TokenService from "./token.service";

const signup = (credentials) => {
    return api.post("/auth/signup", credentials)
        .then((res) => {
            const data = res.data
            if (data.accessToken) {
                TokenService.setUser(data);
            }
            return data;
        })
};

const signin = async (credentials) => {
    const res = await api.post("/auth/signin", credentials)
    const data = res.data
    if (data.accessToken) {
        TokenService.setUser(data);
    }
    
    return data;
};

const logout = () => {
    TokenService.removeUser();
};


const AuthService = {
    signup,
    signin,
    logout, 
};
  
export default AuthService;