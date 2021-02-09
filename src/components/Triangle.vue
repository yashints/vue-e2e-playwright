<template>
  <div class="wrapper" :style="style">
    <img :src="imageUrl" alt="" class="cover" :style="blur" />
    <h1 v-if="headerText" class="header">{{ headerText }}</h1>
    <div class="pointer">
      <div class="triangleWrapper">
        <div style="height: 100%" class="lefttriangle"></div>
      </div>
      <div class="triangleWrapper">
        <div style="height: 100%" class="righttriangle"></div>
      </div>
    </div>
    <div class="card" v-if="showCard">
      <img :src="imageUrl" alt="" class="card-img-top" />
      <div class="card-body">
        <a href="#" class="btn btn-light">{{ cardText }}</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imageUrl: {
      type: String,
      required: true,
    },
    height: {
      type: String,
      required: true,
    },
    showCard: {
      type: Boolean,
    },
    cardText: {
      type: String,
    },
    blurCard: {
      type: Boolean,
    },
    headerText: {
      type: String,
    },
  },
  computed: {
    style() {
      return `height: ${this.height}`;
    },
    blur() {
      if (this.blurCard) return 'filter: blur(8px);';
      return 'margin-top: -300px';
    },
  },
};
</script>

<style scoped>
.header {
  position: absolute;
  top: 80px;
  left: 150px;
  color: #ffffff;
  font-size: 5em;
}
.card {
  position: absolute;
  right: 5%;
  top: 50px;
  width: 200px;
}
.wrapper {
  overflow: hidden;
  position: relative;
}
.cover {
  width: 100%;
}
.pointer {
  height: 50px;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}
.triangleWrapper {
  width: 50%;
  height: 50px;
  float: left;
}

.lefttriangle {
  width: 100%;
  height: 10px;
  left: 0px;
  top: 0px;
  background-image: linear-gradient(to right top, #ffffff 50%, transparent 50%);
}
.righttriangle {
  width: 100%;
  height: 10px;
  right: 0px;
  top: 0px;
  background: linear-gradient(to left top, #ffffff 50%, transparent 50%);
}
</style>
