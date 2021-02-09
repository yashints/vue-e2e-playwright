<template>
  <div class="wrapper">
    <img :src="posterUrl" />
  </div>
</template>

<script>
export default {
  props: {
    posterUrl: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.wrapper {
  position: relative;
  overflow: hidden;
}

.wrapper:after {
  content: '';
  display: block;
  padding-top: 100%;
}

.wrapper img {
  border-radius: 15px;
  width: auto;
  height: 100%;
  max-width: none;
  position: absolute;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
}
</style>
