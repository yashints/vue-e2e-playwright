import createAuth0Client from '@auth0/auth0-spa-js';
import { computed, reactive, watchEffect } from 'vue';

let client;
const state = reactive({
  loading: true,
  isAuthenticated: false,
  user: {},
  popupOpen: false,
  error: null,
});

async function loginWithPopup() {
  state.popupOpen = true;

  try {
    await client.loginWithPopup(0);
  } catch (e) {
    console.error(e);
  } finally {
    state.popupOpen = false;
  }

  state.user = await client.getUser();
  state.claims = await client.getIdTokenClaims();
  state.isAuthenticated = true;
}

async function handleRedirectCallback() {
  state.loading = true;

  try {
    await client.handleRedirectCallback();
    state.user = await client.getUser();
    state.isAuthenticated = true;
  } catch (e) {
    state.error = e;
  } finally {
    state.loading = false;
  }
}

function loginWithRedirect(o) {
  return client.loginWithRedirect(o);
}

function getIdTokenClaims(o) {
  return client.getIdTokenClaims(o);
}

function getUser() {
  return client.getUser();
}

function getTokenSilently(o) {
  return client.getTokenSilently(o);
}

function getTokenWithPopup(o) {
  return client.getTokenWithPopup(o);
}

function logout(o) {
  return client.logout(o);
}

const authPlugin = {
  isAuthenticated: computed(() => state.isAuthenticated),
  loading: computed(() => state.loading),
  user: computed(() => state.user),
  popupOpen: computed(() => state.popupOpen),
  claims: computed(() => state.claims),
  getIdTokenClaims,
  getTokenSilently,
  getTokenWithPopup,
  handleRedirectCallback,
  loginWithRedirect,
  loginWithPopup,
  logout,
  getUser,
};

export const routeGuard = (to, from, next) => {
  const { isAuthenticated, loading, claims } = authPlugin;
  console.log(isAuthenticated.value);
  const verify = () => {
    console.log(isAuthenticated);
    if (!isAuthenticated.value) {
      return next({ path: '/login', query: { returnUrl: to.path } });
    }

    if (to?.meta?.authorize) {
      const roles = claims.value['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      if (roles.find(r => r === to.meta.authorize.role)) {
        return next();
      } else {
        return next('/unauthorized');
      }
    }
  };

  // If loading has already finished, check our auth state using `fn()`
  if (!loading.value) {
    return verify();
  }

  // Watch for the loading property to change before we check isAuthenticated
  watchEffect(() => {
    if (loading.value === false && claims.value) {
      return verify();
    }
  });
};

export const setupAuth = async (options, callbackRedirect) => {
  client = await createAuth0Client({
    ...options,
  });

  try {
    // If the user is returning to the app after authentication

    if (window.location.search.includes('code=') && window.location.search.includes('state=')) {
      // handle the redirect and retrieve tokens
      const { appState } = await client.handleRedirectCallback();

      // Notify subscribers that the redirect callback has happened, passing the appState
      // (useful for retrieving any pre-authentication state)
      callbackRedirect(appState);
    }
  } catch (e) {
    state.error = e;
  } finally {
    // Initialize our internal authentication state
    state.isAuthenticated = await client.isAuthenticated();
    state.user = await client.getUser();
    state.claims = await client.getIdTokenClaims();
    state.loading = false;
  }

  return {
    install: app => {
      app.config.globalProperties.$auth = authPlugin;
    },
  };
};
