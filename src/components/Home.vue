<template>
  <section>
    <div class="row">
      <div class="col-lg-4 ml-5 pt-5">
        <div class="input-group mb-4 border rounded-pill p-1">
          <div class="input-group-prepend border-0">
            <button id="button-addon4" type="button" class="btn btn-link text-info">
              <BIconSearch />
            </button>
          </div>
          <input
            type="search"
            id="search"
            placeholder="What're you searching for?"
            aria-describedby="button-addon4"
            class="form-control bg-none border-0"
            v-model="searchTerm"
          />
        </div>
      </div>
    </div>

    <Loader v-if="isLoading" />
    <div class="row ml-5">
      <Movie v-for="movie in movies" :key="movie.movieId" :movie="movie" />
    </div>
  </section>
</template>

<script>
import { BIconSearch } from 'bootstrap-icons-vue';
import Loader from '@/components/Loader';
import Movie from '@/components/Movie';
import store from '../store';
export default {
  data() {
    return {
      isLoading: true,
      searchTerm: null,
    };
  },
  computed: {
    movies() {
      return this.$store.getters.movies(this.searchTerm);
    },
  },
  created() {
    store.dispatch('fetchMovies').then(() => {
      this.isLoading = false;
    });
  },
  components: {
    Loader,
    Movie,
    BIconSearch,
  },
};
</script>
