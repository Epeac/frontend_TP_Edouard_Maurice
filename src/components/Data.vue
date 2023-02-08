<template>
  <br />
  <!--<h2>Data:</h2>
  <ul v-if="dataTest.length">
    <li v-for="item in dataTest" :key="item._id">{{ item.filmType }}</li>
  </ul>
  <p v-else>No data to display</p>-->
  <div>
    <div v-for="film in currentFilms" :key="film._id">
      <button @click="goToFilmDetails(film._id)">{{ film.filmName }}</button>
    </div>
    <br />
    <div>
      <button @click="previousPage">Previous</button>
      <button @click="nextPage">Next</button>
      <div v-if="role === 'admin'">
        <button @click="createFilm">Add Film</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      token: localStorage.getItem('token'),
      films: [],
      currentPage: 1,
      itemsPerPage: 10,
      role: '',
    };
  },
  computed: {
    currentFilms() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.films.slice(start, end);
    },
  },
  async mounted() {
    await this.fetchFilms();
    this.role = await this.userRole();
  },
  methods: {
    async userRole() {
      try {
        const response = await axios.get('http://localhost:3000/users/me', {
          headers: {
            'Authorization': `Bearer ${this.token}`,
          }
        },);
        return response.data.role;
      } catch (error) {
        return error.response;
      }
    },
    async fetchFilms() {
      const { data } = await axios.get('http://localhost:3000/locations', {
        headers: {
          'Authorization': `Bearer ${this.token}`,
        }});
      this.films = data;
    },
    goToFilmDetails(filmId) {
      this.$router.push(`/filmDetails/${filmId}`);
    },
    createFilm() {
      this.$router.push('/createFilm');
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < Math.ceil(this.films.length / this.itemsPerPage)) {
        this.currentPage++;
      }
    },
  },
};
/*export default {
  data() {
    return {
      token: localStorage.getItem('token'),
      movies: [], // The list of movies from the API
      currentPage: 1, // The current page of movies to display
      perPage: 10 // The number of movies to display per page
    }
  },
  computed: {
    currentMovies() {
      // Return the current set of movies to display
      const startIndex = (this.currentPage - 1) * this.perPage
      return this.movies.slice(startIndex, startIndex + this.perPage)
    }
  },
  mounted() {

    },
  methods: {
    async getFilms() {
      // Fetch the list of movies from the API
      const {data} = await axios.get('http://localhost:3000/locations', {
        headers: {
          'Authorization': `Bearer ${this.token}`,
        }
      });
      this.movies = data;
    },
    previousPage() {
      // Go to the previous page of movies
      if (this.currentPage > 1) {
        this.currentPage--
      }
    },
    nextPage() {
      // Go to the next page of movies
      if (this.currentPage < Math.ceil(this.movies.length / this.perPage)) {
        this.currentPage++
      }
    }
  }
}*/
</script>