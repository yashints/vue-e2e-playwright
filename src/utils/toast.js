export default {
  install: app => {
    app.config.globalProperties.$errorToast = function(msg) {
      app.config.globalProperties.$toast(msg, {
        styles: {
          color: '#fff',
          backgroundColor: '#e63946',
        },
      });
    };

    app.config.globalProperties.$successToast = function(msg) {
      app.config.globalProperties.$toast(msg, {
        styles: {
          color: '#fff',
          backgroundColor: '#2a9d8f',
        },
      });
    };

    app.config.globalProperties.$warningToast = function(msg) {
      app.config.globalProperties.$toast(msg, {
        styles: {
          color: '#fff',
          backgroundColor: '#e85d04',
        },
      });
    };

    app.config.globalProperties.$infoToast = function(msg) {
      app.config.globalProperties.$toast(msg, {
        styles: {
          color: '#fff',
          backgroundColor: '#00b4d8',
        },
      });
    };
  },
};
