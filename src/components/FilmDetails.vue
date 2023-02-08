<template>
  <div>
    <h2>Nom : {{filmInfos.filmName}}</h2>
    <h4>Type : {{filmInfos.filmType}}</h4>
    <h4>Nom du(des) directeur(s) : {{filmInfos.filmDirectorName}}</h4>
    <h4>Société de production : {{filmInfos.filmProducerName}}</h4>
    <h4>Adresse : {{filmInfos.address}}</h4>
    <h4>Arrondissemnt : {{filmInfos.district}}</h4>
    <h4>Année : {{filmInfos.year}}</h4>
  </div>
  <div v-if="role === 'admin'">
    <button @click="goToEditFilm(filmId)">Edit</button>
    <button @click="confirmDelete">Delete</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      filmId: this.$route.params.filmId,
      filmInfos: [],
      role: '',
    };
  },
  async mounted() {
    await this.fetchFilmInfos();
    this.role = await this.userRole();
  },
  methods: {
    async fetchFilmInfos() {
      const {data} = await axios.get(`http://localhost:3000/locations/${this.filmId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
        }
      });
      this.filmInfos = data;
    },
    async userRole() {
      try {
        const response = await axios.get('http://localhost:3000/users/me', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
          }
        },);
        return response.data.role;
      } catch (error) {
        return error.response;
      }
    },
    async confirmDelete() {
      if(confirm("Are you sure you want to delete this film ?")) {
        await this.deleteFilm();
      }
    },
    async deleteFilm() {
      try {
        await axios.delete(`http://localhost:3000/locations/${this.filmId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          }
        });
        alert('Film deleted successfully !');
        this.$router.back();
      } catch (error) {
        alert('An error occurred, please try again later');
      }
    },
    goToEditFilm(filmId) {
      this.$router.push(`/editFilm/${filmId}`);
    },
  }
};
</script>