<template>
  <div>
    <h4>Logi sisse</h4>
    <div class="col-md-12 form-wrapper">
      <br />
      <form id="create-post-form">
        <div
          class="form-group col-md-12"
        >
          <label>E-mail: </label>
          <input
            type="text"
            id="email"
            v-model="user.email"
            name="title"
            class="form-control mb-5"
            placeholder="Nimi"
            required
          />
        </div>

        <div class="form-group col-md-12">
          <label> Parool: </label>
          <input
            type="password"
            id="password"
            v-model="user.password"
            name="title"
            class="form-control"
            placeholder="Parool"
            required
          />
        </div>

        <br />
        <b-button size="sm" variant="outline-primary" @click="loginUser"
          >Logi sisse!</b-button
        >

        <div class="col-md-12">
          {{ errorMessage }}
        </div>
      </form>
    </div>

    <p>
      <br />
      Regristreeri kasutajals
      <router-link to="/register">vajutades siia </router-link>
    </p>
  </div>
</template>

<script>
import jwt_decode from "jwt-decode";
import axios from "axios";
export default {
  name: "add",
  data() {
    return {
      user: {
        email: "", //tegemist formiga, tühi string, kuhu läheb sisestatud tekst formilt
        password: "",
      },
      errorMessage: "",
    };
  },
  methods: {
   async loginUser() { //kutsun üleval välja, võtab uue meetodiga uue data
     try {
      const response = await axios.post('api/userLogin', this.user) //suuname back endi, this userist tulevad data alt email ja password
          let token = response.data.token;
          console.log(token);
          localStorage.setItem("jwt", token); //salvestame localstoragisse ära tokeni
          var decoded = jwt_decode(token); //dekodeerime tokeni ja saame kasutaja accesstype
          localStorage.setItem("accessType", decoded.accessType); //salvestame localstoragisse ära accesstype
          this.$router.push("/products"); // kui logimine õnnestub suuname ümber teisele routile toodete tabelisse
        }
        catch (error) {
          this.errorMessage = error.response.data.message;
          console.log(error.message);
        };
        
    },
/*eraldi then osa pole //VARIANT 2 logimisel koodi kirjutamisel lihtsalt axiose välja kutsumisega
    loginUser() {
      //kutsun üleval välja, võtab uue meetodiga uue data
      axios
        .post("api/userLogin", this.user) //suuname back endi, this userist tulevad data alt email ja password
        .then((response) => {
          let token = response.data.token;
          console.log(token);
          localStorage.setItem("jwt", token); //salvestame localstoragisse ära tokeni
          var decoded = jwt_decode(token); //dekodeerime tokeni ja saame kasutaja accesstype
          localStorage.setItem("accessType", decoded.accessType); //salvestame localstoragisse ära accesstype
          this.$router.push("/products"); // kui logimine õnnestub suuname ümber teisele routile toodete tabelisse
        })
        .catch((error) => {
          this.errorMessage = error.response.data.message;
          console.log(error.message);
        });
    }, */
  },
};
</script>