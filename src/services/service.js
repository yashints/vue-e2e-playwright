const axios = require('axios');

const httpClient = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

export default {
  fetchMovies() {
    return httpClient.get('/api/movies');
  },

  fetchMovieDetails(id) {
    return httpClient.get(`/api/movies/${id}`);
  },

  fetchCinemas() {
    return httpClient.get('/api/cinemas');
  },

  getUserByEmail(email) {
    return httpClient.get(`/api/users/email/${email}`);
  },

  updateUser(user) {
    return httpClient.post('/api/users', user);
  },

  getAllUsers() {
    return httpClient.get('/api/users');
  },

  updateUserRoles(email, roles) {
    return httpClient.put(`api/users/${email}`, roles);
  },
};
