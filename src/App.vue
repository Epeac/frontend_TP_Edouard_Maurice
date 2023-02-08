<script>
export default {
  computed: {
    isLoggedIn() {
      return !!localStorage.getItem('token',);
    },
  }
}
</script>

<template>
  <nav v-if="!isLoggedIn">
    <router-link to="/">Home</router-link> |
    <router-link to="/login">Login</router-link>
  </nav>
  <nav v-else>
    <router-link to="/">Home</router-link> |
    <router-link v-if="isLoggedIn" to="/data">Data</router-link>
  </nav>
  <router-view/>
</template>

<style>
.error-message {
  color: red;
}
</style>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>