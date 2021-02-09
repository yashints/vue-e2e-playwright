<template>
  <div class="navbar navbar-expand-lg">
    <a class="navbar-brand" href="#">
      <img src="../assets/stage.svg" width="32" height="32" />
    </a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <router-link to="/" class="nav-link">Home <span class="sr-only">(current)</span></router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/about">About</router-link>
        </li>
      </ul>
      <ul class="nav navbar-nav ml-auto" v-if="!user">
        <li class="nav-item">
          <router-link class="nav-link login" to="/login"><BIconLock /> Login</router-link>
        </li>
      </ul>
      <ul class="nav navbar-nav ml-auto" v-if="user">
        <li class="nav-item">
          <a class="nav-link greeting" href="/"> {{ greeting }} {{ user.firstName ?? user.name }} </a>
        </li>
        <li class="nav-item">
          <a class="nav-link logout" v-on:click="logout"><BIconArrow90degRight /> Logout</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import router from '@/router';
import { mapGetters } from 'vuex';
import { BIconLock, BIconArrow90degRight } from 'bootstrap-icons-vue';

export default {
  methods: {
    logout: async function() {
      this.$auth.logout();
      this.$store.commit('LOGOUT');
      router.push('/');
    },
  },
  computed: {
    ...mapGetters(['user']),
    greeting() {
      return this.user.existing ? 'Welcome' : 'Welcome back';
    },
  },
  components: {
    BIconLock,
    BIconArrow90degRight,
  },
};
</script>

<style scoped>
.navbar {
  background-color: #293241;
}
.nav-link {
  display: flex;
  flex-direction: row;
  align-items: center;
  color: rgb(255, 255, 255, 0.6);
}
.nav-link > svg {
  margin-right: 10px;
}
.nav-link.router-link-active {
  color: #fff;
}

.logout {
  cursor: pointer;
}
</style>
