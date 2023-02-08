<script>
import axios from 'axios';
export default {
  data() {
    return {
      awesome: true,
      username: localStorage.getItem('username'),
      token: localStorage.getItem('token',),
      role: localStorage.getItem('role',),
      dataTest: [],
    };
  },
  computed: {
    message() {
      return this.token ? `Welcome ${localStorage.getItem('username')} !` : "Please Login. " +
          "If not, you will automatically be redirected to the Login page if you try to access the Data page.";
    },
  },
  methods: {
    logout() {
      this.token, this.role, this.username = null;
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('role');
      this.goToPage('/login');
    },
    async getFilms() {
      try {
        const { data } = await axios.get('http://localhost:3000/locations', {
          headers: {
            'Authorization': `Bearer ${this.token}`,
          },
        });
        this.dataTest = data;
      }
      catch(error) {
        console.error(error);
      }
    },
    goToPage(path) {
      this.$router.push({ path: path });
    }
  },
  mounted() {
    if (this.token) {
      this.getFilms();
    }
  },
}
</script>

<template>
  <main>
    <p>{{message}}</p>
    <template v-if="token">
      <button @click="logout">Logout</button>
    </template>
    <template v-else>
      <button @click="goToPage('/login')">Login</button>
      <button @click="goToPage('/register')">Register</button>
    </template>
  </main>
</template>