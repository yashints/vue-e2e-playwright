import { createStore } from 'vuex';
import service from '../services/service';
import VuexPersistence from 'vuex-persist';

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});

export default createStore({
  state: {
    movies: [],
    movieDetails: {},
    cinemas: [],
    userInfo: null,
    users: null,
  },

  getters: {
    movies: state => filter => {
      if (filter) {
        return state.movies.filter(x => x.title.toLowerCase().includes(filter.toLowerCase()));
      }
      return state.movies;
    },
    movie: state => movieId => {
      return state.movies.find(x => x.movieId === movieId);
    },
    cinemas: state => {
      return state.cinemas;
    },
    user: state => {
      return state.userInfo;
    },
    users: state => {
      return state.users;
    },
  },

  mutations: {
    SET_MOVIES(state, movies) {
      state.movies = movies;
    },

    SET_MOVIE(state, payload) {
      const { movieId, data } = payload;
      state.movieDetails[movieId] = data;
    },

    SET_CINEMAS(state, payload) {
      state.cinemas = payload;
    },

    SET_USER(state, userInfo) {
      state.userInfo = userInfo;
    },

    LOGOUT(state) {
      state.userInfo = null;
    },

    SET_USERS(state, users) {
      state.users = users;
    },
  },
  actions: {
    async fetchMovies(context) {
      try {
        const response = await service.fetchMovies();
        context.commit('SET_MOVIES', response.data.movies);
      } catch (error) {
        console.log(error);
        context.commit('SET_MOVIES', null);
      }
    },

    async fetchMovieDetails(context, id) {
      try {
        const movie = await service.fetchMovieDetails(id);
        context.commit('SET_MOVIE', movie.data);
      } catch (error) {
        context.commit('SET_MOVIE', null);
      }
    },

    async fetchCinemas(context) {
      try {
        const response = await service.fetchCinemas();
        context.commit('SET_CINEMAS', response.data.cinemas);
      } catch (error) {
        console.log(error);
        context.commit('SET_CINEMAS', null);
      }
    },

    async updateUser(context, action) {
      try {
        const updated = await service.updateUser(action.user, action.access_token);
        if (!updated) {
          throw 'Failed to update the user!';
        }
        return updated;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },

    async getUserByEmail(context, action) {
      try {
        const user = await service.getUserByEmail(action.email, action.access_token);
        return user;
      } catch (error) {
        return null;
      }
    },

    async getUsers(context) {
      const response = await service.getAllUsers();
      context.commit('SET_USERS', response.data.users);
    },

    async updateUserRoles(context, action) {
      const user = await service.updateUserRoles(action.email, action.roles, action.access_token);
      return user;
    },
  },
  plugins: [vuexLocal.plugin],
  modules: {},
});
