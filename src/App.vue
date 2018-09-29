<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload() {
      this.isRouterAlive = false
      this.$nextTick(function() {
        this.isRouterAlive = true
      })
    }
  }
}
</script>

<style lang="scss">

.flex-row {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.flex-column {
  display: flex;
  flex-direction: column;
}

.flex-center {
  align-items: center;
  justify-content: center;
}

.space-between {
  justify-content: space-between;
}

.space-around {
  justify-content: space-around;
}

.one-line {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow:hidden;
}

.text-align-center {
  text-align: center;
}

.text-align-left {
  text-align: left;
}

.yello-button {
  cursor: pointer;
  background: #FDE01B;
  border: 0px solid #ccc;
  padding: 0px 30px;
  margin-left: 30px;
  width: 120px;
}
</style>
