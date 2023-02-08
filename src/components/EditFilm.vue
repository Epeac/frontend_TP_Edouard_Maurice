<template>
  <div>
    <h1>Edit Film</h1>
    <form @submit.prevent="submitEditForm">
      <div>
        <label for="filmName">Name:</label>
        <input type="text" id="filmName" v-model="filmName" />
      </div>
      <div>
        <label for="filmType">Film Type:</label>
        <input type="text" id="filmType" v-model="filmType" />
      </div>
      <div>
        <label for="filmDirectorName">Film Director Name:</label>
        <input type="text" id="filmDirectorName" v-model="filmDirectorName" />
      </div>
      <div>
        <label for="filmProducerName">Film Producer Name:</label>
        <input type="text" id="filmProducerName" v-model="filmProducerName" />
      </div>
      <div>
        <label for="address">Address:</label>
        <input type="text" id="address" v-model="address" />
      </div>
      <div>
        <label for="district">District:</label>
        <input type="text" id="district" v-model="district" />
      </div>
      <div>
        <label for="year">Year:</label>
        <input type="text" id="year" v-model="year" />
      </div>
      <br />
      <button type="submit">Submit Changes</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      filmId: this.$route.params.filmId,
      filmName: '',
      filmType: '',
      filmDirectorName: '',
      filmProducerName: '',
      address: '',
      district: '',
      year: '',
    }
  },
  created() {
    this.filmId = this.$route.params.filmId;
    this.fetchFilm();
  },
  methods: {
    async fetchFilm() {
      try {
        const { data } = await axios.get(`http://localhost:3000/locations/${this.filmId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          }
        });
        this.filmName = data.filmName;
        this.filmType = data.filmType;
        this.filmDirectorName = data.filmDirectorName;
        this.filmProducerName = data.filmProducerName;
        this.address = data.address;
        this.district = data.district;
        this.year = data.year;
      } catch (error) {
        console.error(error);
      }
    },
    async submitEditForm() {
      try {
        await axios.patch(`http://localhost:3000/locations/${this.filmId}`, {
          filmName: this.filmName,
          filmType: this.filmType,
          filmDirectorName: this.filmDirectorName,
          filmProducerName: this.filmProducerName,
          address: this.address,
          district: this.district,
          year: this.year
        }, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          }
        });
        alert('Location updated successfully!');
      } catch (error) {
        alert('An error occurred, please try again later');
      }
    }
  }
};
</script>