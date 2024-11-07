// store/auth.js
export const state = () => ({
    isAuthenticated: false,
    user: null,
  });
  
  export const mutations = {
    setAuth(state, payload) {
      state.isAuthenticated = payload.isAuthenticated;
      state.user = payload.user;
    },
    clearAuth(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
  };
  
  export const actions = {
    async checkAuth({ commit }) {
      if (process.client) {
        const token = localStorage.getItem('token');
        if (token) {
          this.$axios.setToken(token, 'Bearer');
          try {
            const response = await this.$axios.$get('/auth/user');
            commit('setAuth', { isAuthenticated: true, user: response.user });
          } catch (error) {
            console.error('Error checking auth:', error);
            commit('clearAuth');
          }
        }
      }
    },
    async login({ commit }, { email, password }) {
      try {
        const response = await this.$axios.$post('/auth/login', { email, password });
        commit('setAuth', { isAuthenticated: true, user: response.user });
        localStorage.setItem('token', response.token);
        this.$axios.setToken(response.token, 'Bearer');
      } catch (error) {
        console.error('Error logging in:', error);
      }
    },
    async logout({ commit }) {
      try {
        commit('clearAuth');
        localStorage.removeItem('token');
        this.$axios.setToken(false); // Remove the token
      } catch (error) {
        console.error('Error logging out:', error);
      }
    },
  };
  
  export const namespaced = true;
  