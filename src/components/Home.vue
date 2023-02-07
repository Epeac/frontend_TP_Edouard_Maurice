<script>
import axios from 'axios';
export default {
  name: "Home",
  data() {
    return {
      awesome: true,
      //testStorage: localStorage.getItem("test") || "flûte",
      username: localStorage.getItem('username'),
      token: localStorage.getItem('token',),
      role: localStorage.getItem('role',),
      dataTest: [],
    };
  },
  computed: {
    message() {
      return this.token ? 'Welcome !' : 'Please Login';
    },
  },
  methods: {
    toggle() {
      this.awesome = !this.awesome
      this.testStorage = "ça marche !"
      localStorage.setItem("test", this.testStorage)
    },
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
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2M2QwZTdiYjNhMmFiNzYxOTlmZDVjYzgiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NzU1OTU3MzJ9.flVvfL56ttQNBcfrsiwcCtM1sgGk87hCT0HHKlqcJno`, //${this.token}`,
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
  <!--<header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
    </div>

    <div>
      <button @click="toggle">toggle</button>
      <h1 v-if="awesome">Vue is awesome!</h1>
      <h1 v-else>Oh no 😢</h1>
    </div>

    <div>{{ testStorage}}</div>

    <div>
      <h1>{{ message }}</h1>
    </div>
  </header>-->

  <main>
    <template v-if="!token">
      <div>
        <!--<router-link to="/">Home</router-link> |
        <router-link to="/login">Login</router-link> |
        <router-link to="Data">Data</router-link>-->
        <button @click="goToPage('/')">Home</button>
        <button @click="goToPage('/login')">Login</button>
        <button @click="goToPage('/data')">Data</button>
        <router-view />
      </div>
      <!--<router-view />
      <button @click="goToLoginPage">Login</button>
      <form @submit.prevent="login">
        <input type="text" v-model="username"/>
        <input type="password" v-model="password"/>
        <button type="submit">Login</button>
      </form>-->
    </template>
    <template v-else>
      <p>Welcome {{ username }} !</p>
      <p>Here is your token -- {{token}}</p>
      <button @click="logout">Logout</button>
      <h2>Data:</h2>
      <ul v-if="dataTest.length">
        <li v-for="item in dataTest" :key="item._id">{{ item.filmType }}</li>
      </ul>
      <p v-else>No data to display</p>
    </template>
  </main>
</template>