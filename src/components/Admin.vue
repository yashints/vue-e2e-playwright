<template>
  <div class="users mt-5">
    <h1>User management</h1>
    <p>This page can only be accessed by administrators.</p>
    <div>
      <h3>Users:</h3>
      <div v-if="users.length" class="user-list">
        <span>
          <strong>Name</strong>
        </span>
        <span>
          <strong>Role</strong>
        </span>
        <template v-for="user in users" :key="user.id">
          <span>
            {{ user.name }}
          </span>
          <span>
            <select class="custom-select" @change="updateUser($event, user)" :disabled="disabled">
              <option :selected="!userRoleMatches(user, role)">Select a role</option>
              <option v-for="role in roles" :key="role" :selected="userRoleMatches(user, role)">{{ role }}</option>
            </select>
          </span>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import Roles from '@/router/roles';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      disabled: false,
    };
  },
  computed: {
    ...mapGetters(['users', 'user']),
    roles() {
      return Roles.map(r => r.name);
    },
  },
  mounted() {
    this.$store.dispatch({
      type: 'getUsers'
    });
  },
  methods: {
    updateUser(e, user) {
      this.disabled = true;

      this.$store
        .dispatch({
          type: 'updateUserRoles',
          email: user.email,
          roles: [{ name: e.target.options[e.target.options.selectedIndex].value }],
          access_token: this.user.access_token,
        })
        .then(() => {
          this.$successToast('User role updated');
          this.disabled = false;
        });
    },
    userRoleMatches(user, role) {
      return user.roles && user.roles[0].name === role;
    },
  },
};
</script>

<style scoped>
.users {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.user-list {
  margin-top: 50px;
  max-width: 500px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  border-top: 1px solid #ddd;
  border-right: 1px solid #ddd;
}

.user-list > span {
  padding: 10px;
  border-left: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  line-height: 40px;
  vertical-align: middle;
}
</style>
