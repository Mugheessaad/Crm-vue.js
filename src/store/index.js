import { createStore } from 'vuex'

export default createStore({
  state: {
    imageData : "",
    userName : "",
    userType : "",
    userCompany : "",
    isLoggedIn : false,
  },

  getters: { 
  },

  mutations: {
    setLoginDataToDashboard(state,obj){
          state.imageData = obj.img;
          state.userCompany = obj.company;
          state.userName = obj.username;
          state.userType = obj.type;
          state.isLoggedIn = obj.isLoggedIn;
    },
  },
  actions: {
    
  }
});