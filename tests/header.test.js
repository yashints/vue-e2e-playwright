import { createStore } from 'vuex';
import { shallowMount, mount, flushPromises } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import Header from '@/components/Header.vue';

describe('Header component', () => {
  let store, mockRouter;

  beforeEach(() => {
    store = createStore({
      state() {
        return {
          user: null,
        };
      },
      getters: {
        user(state) {
          return state.user;
        },
      },
      mutations: {},
    });

    mockRouter = {
      push: jest.fn(),
    };
  });

  it('should not show the logout button to guest users', () => {
    const wrapper = shallowMount(Header, {
      global: {
        plugins: [store],
        mocks: {
          $router: mockRouter,
        },
        stubs: ['router-link', 'router-view'],
      },
    });

    expect(wrapper.find('.logout').exists()).toBeFalsy();
  });

  it('should show the logout button to authenticated users', () => {
    store = createStore({
      state() {
        return {
          user: {
            name: 'Yas',
            email: 'test@test.com',
          },
        };
      },
      getters: {
        user(state) {
          return state.user;
        },
      },
      mutations: {},
    });
    const wrapper = shallowMount(Header, {
      global: {
        plugins: [store],
        mocks: {
          $router: mockRouter,
        },
        stubs: ['router-link', 'router-view'],
      },
    });

    expect(wrapper.find('.logout').exists()).toBeTruthy();
  });

  it('should show the welcome back message to existing users', () => {
    store = createStore({
      state() {
        return {
          user: {
            firstName: 'Yas',
            email: 'test@test.com',
            existing: false,
          },
        };
      },
      getters: {
        user(state) {
          return state.user;
        },
      },
      mutations: {},
    });
    const wrapper = shallowMount(Header, {
      global: {
        plugins: [store],
        mocks: {
          $router: mockRouter,
        },
        stubs: ['router-link', 'router-view'],
      },
    });

    expect(wrapper.find('.greeting').text()).toBe('Welcome back Yas');
  });

  it('should show the welcome message to new users', () => {
    store = createStore({
      state() {
        return {
          user: {
            firstName: 'Yas',
            email: 'test@test.com',
            existing: true,
          },
        };
      },
      getters: {
        user(state) {
          return state.user;
        },
      },
      mutations: {},
    });
    const wrapper = shallowMount(Header, {
      global: {
        plugins: [store],
        mocks: {
          $router: mockRouter,
        },
        stubs: ['router-link', 'router-view'],
      },
    });

    expect(wrapper.find('.greeting').text()).toBe('Welcome Yas');
  });

  it('should redirect to login when the login button is pressed', async () => {
    const router = createRouter({
      history: createWebHistory(),
      routes: [
        { path: '/', component: { template: 'Home' } },
        { path: '/about', component: { template: 'About' } },
        {
          path: '/login',
          component: {
            template: 'Login',
          },
        },
      ],
    });

    const wrapper = mount(Header, {
      global: {
        plugins: [store, router],
      },
    });

    const login = wrapper.find('.login');
    await login.trigger('click');
    await flushPromises();
    expect(wrapper.html()).toContain('Login');
  });
});
