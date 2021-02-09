<template>
  <section>
    <Loader v-if="isLoading" />
    <section v-if="hasDetails">
      <BackdropImage :imageName="movie.backdrop_path" />
      <div class="container pt-5">
        <div class="row">
          <div class="col-sm-4">
            <Poster :posterName="movie.poster_path" />
          </div>
          <div class="col-sm-8 details">
            <h2>{{ movie.title }}</h2>
            <p>{{ movie.overview }}</p>
            <div>Runtime: {{ runtime }}</div>
            <div>Average Rating: {{ movie.vote_average.toFixed(1) }}</div>
            <div>Production company: {{ movie.production_companies[0].name }}</div>
            <div>Release Date: {{ movie.release_date }}</div>
            <h4>Trailers</h4>
            <a :href="trailer.url" v-for="trailer in trailers" :key="trailer.id" class="trailer" target="_blank">
              <img :src="trailer.thumbnail" />
            </a>
            <a :href="ticketsPath" class="btn btn-success">Get Tickets</a>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import Loader from '@/components/Loader';
import BackdropImage from '@/components/BackdropImage';
import Poster from '@/components/Poster';
export default {
  data() {
    return {
      hasDetails: false,
      isLoading: true,
    };
  },
  created() {
    this.$store.dispatch('fetchMovieDetails', this.movieId).then(() => {
      this.isLoading = false;
      this.hasDetails = true;
    });
  },
  computed: {
    movieId() {
      return this.$route.params.id;
    },
    movie() {
      return this.$store.state.movieDetails[this.movieId];
    },
    // calculate movie time.
    runtime() {
      const runtime = this.movie.runtime;
      const hours = Math.floor(runtime / 60);
      const minutes = runtime - 60 * hours;
      return `${hours}h ${minutes}m`;
    },
    ticketsPath() {
      return `/movie/${this.movieId}/tickets`;
    },
    trailers() {
      const trailers = [];
      this.movie.videos.results.forEach(video => {
        if (video.type === 'Trailer') {
          trailers.push({
            thumbnail: `https://i.ytimg.com/vi/${video.key}/sddefault.jpg`,
            url: `https://youtube.com/watch?v=${video.key}`,
          });
        }
      });
      return trailers;
    },
  },
  components: {
    Loader,
    BackdropImage,
    Poster,
  },
};
</script>

<style scoped>
.details {
  color: white;
}
.trailer {
  width: 150px;
  height: 110px;
  display: block;
  float: left;
  margin-right: 20px;
}
.trailer img {
  width: 100%;
  height: 100%;
}
</style>
