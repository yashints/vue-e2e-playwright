import { Server, Model, Response } from 'miragejs';
const movies = require('./api/movies.json');
const cinemas = require('./api/cinemas.json');
export function makeServer({ environment = 'development' } = {}) {  
  let server = new Server({
    environment,

    models: {
      movie: Model,
      cinema: Model,
      user: Model,
    },
    
    seeds(server) {
      movies.forEach(m => {
        server.create('movie', {...m});
      });
      cinemas.forEach(c => {
        server.create('cinema', {...c});
      });
      server.create('user', {
        DoB: "2021-02-09",
        email: "ADMIN_USER",
        name: "Admin",
      })   
    },

    routes() {
      this.namespace = '/api';

      this.get('/movies', schema => {
        return schema.movies.all();
      });

      this.get('/cinemas', schema => {
        return schema.cinemas.all();
      });

      this.get('/users', schema => {
        return schema.users.all();
      });

      this.get('/users/email/:email', (schema, request) => {
        let email = request.params.email;
        return schema.users.findBy( {email: email });
      });

      this.post('/users', (schema, request) => {
        let user = JSON.parse(request.requestBody);
        let existing = schema.users.findBy( {email: user.email });
        let updated = {};
        if (existing) {
          Object.keys(existing).forEach(function(key) {
            if (existing[key] != user[key]) {
              updated[key] = user[key];
            }
          });
          existing.update(updated);
        } else {
          return schema.users.create({...user});
          
        };
      });

      this.patch('/users/:email', (schema, request) => {
        let email = request.params.email;
        let roles = JSON.parse(request.requestBody);
        let existing = schema.users.findBy( {email: email });
        if(!existing) {
          return new Response(404, 'Resource not found');
        }        
        return existing.update({ roles: roles });
      });

      this.passthrough('https://yas-vueauth-ps21.au.auth0.com/**');
    },
  });

  return server;
}
