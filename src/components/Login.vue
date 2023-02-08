<template>
  <h1>Login Page</h1>
  <router-link to="/register">Need an account ?</router-link>
  <router-view />
  <form @submit.prevent="submitLoginForm">
    <div>
      <label for="username">Username: </label>
      <input id="username" type="text" v-model="username" required />
    </div>
    <div>
      <label for="password">Password: </label>
      <input id="password" type="password" v-model="password" required />
    </div>
    <br/>
    <button type="submit">Login</button>
  </form>
</template>

<script>
import axios from 'axios';
//import { goToPage } from './Home.vue';

export default {
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    async userRole() {
      const response = await axios.get('http://localhost:3000/users/me', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      },);
      return response.data.role;
    },
    async login(username, password) {
      try {
        const response = await axios.post('http://localhost:3000/users/login', {username, password});
        localStorage.setItem('token', response.data.jwt);
        localStorage.setItem('username', username);
      } catch (error) {
        console.error(error);
      }
    },
    async submitLoginForm() {
      await this.login(this.username, this.password);
      this.$router.push({ path: '/' });
    }
  }
};
</script>