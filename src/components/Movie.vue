<template>
  <div class="card bg-light col-md-2 m-2 pt-4 box-shadow">
    <router-link :to="movieDetailsPath" class="link-container">
      <Poster :posterUrl="movie.graphicUrl ?? ''" :alt="movie.title" />
      <div class="card-body p-2 pt-4 d-flex flex-column justify-content-between">
        <h5 class="card-title">{{ movie.title }}</h5>
        <div class="card-text ">
          <span :class="ratingClass">{{ movie.rating }}</span>
          <small class="text-muted">{{ movie.runtime }} mins</small>
          <router-link :to="bookingPath" class="btn btn-secondary btn-block mt-3">
            Book
          </router-link>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import Poster from '@/components/Poster';
export default {
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
  computed: {
    movieDetailsPath() {
      return `/movie/${this.movie.movieId}`;
    },
    bookingPath() {
      return `/`;
    },
    ratingClass() {
      switch (this.movie.rating) {
        case 'M':
          return 'badge badge-primary';
        case 'MA15':
          return 'badge badge-danger';
        case 'PG':
        case 'CTC':
          return 'badge badge-warning';
        case 'G':
          return 'badge badge-success';
        case 'E':
          return 'badge badge-info';
        default:
          return '';
      }
    },
  },
  components: {
    Poster,
  },
};
</script>

<style scoped>
a {
  color: inherit;
}
.badge {
  margin-right: 10px;
}
.link-container {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.btn-secondary {
  color: white;
}
</style>
