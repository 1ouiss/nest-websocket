import api from "./api.service";
import {jwtDecode} from "jwt-decode";

const getCurrentUser =  () => {
    const data = JSON.parse(window.localStorage.getItem("user")) 
    
    if (data && data.accessToken) { 
      const  tokenDecode = jwtDecode(data.accessToken);
      
      if(tokenDecode){
        delete tokenDecode.iat
        delete tokenDecode.exp
        
        return tokenDecode
      }
      return false;
    }
    return false;
} 

const account = () => {
  return api.get(`/users/account`)
      .then((res) => {
          const data = res.data
          return data;
      })
}

const update = (credentials) => {
  return api.patch(`/users/account`, credentials)
      .then((res) => res.data)
};

const getAll = () => {
  return api.get(`/users`)
      .then((res) => res.data)
};

const getAllWithFilters = (queryDatas) => {
  let query = ""

  Object.keys(queryDatas).map(data => {
    query += `${data}=${queryDatas[data]}&`
  })

  return api.get(`/users?${query}`)
      .then((res) => res.data)
};

const uploadAvatar = (avatar) => {
  const formData = new FormData();
  formData.append('avatar', avatar);

  return api.post('/users/avatar', 
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } })
          .then(res => res.data)
}

const getAvatar = () => {
  return api.get('/users/avatar',
  {
    responseType: 'blob',
  }) 
      .then(res => res.data)
}

const getAvatarByUserId = (id) => {
  return api.get(`/users/${id}/avatar`,
  {
    responseType: 'blob',
  }) 
      .then(res => res.data)
}

const UserService = {
  getAvatarByUserId,
  getAvatar,
  getCurrentUser,
  update,
  account,
  getAll,
  getAllWithFilters,
  uploadAvatar
};

export default UserService;