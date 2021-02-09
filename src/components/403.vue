<template>
  <div class="container py-5">
    <div class="text-center">
      <h1><BIconShieldLock style="color: #dc3545" /></h1>
    </div>
    <div>
      <h3>OPPSSS!!!! Sorry...</h3>
      <p>
        Sorry, your access is refused due to security reasons of our server and also our sensitive data.<br />Please go back to
        the previous page to continue browsing.
      </p>
      <p>
        If you believe there has been a mistake and you need the access, contact your administrator to get it fixed.
      </p>
      <a class="btn btn-danger" href="javascript:history.back()">Go Back</a>
    </div>
  </div>
</template>

<script>
import { BIconShieldLock } from 'bootstrap-icons-vue';
export default {
  components: {
    BIconShieldLock,
  },
};
</script>
