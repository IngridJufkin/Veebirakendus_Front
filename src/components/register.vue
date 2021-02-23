<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-6 offset-lg-3 col-sm-10 offset-sm-1">
        <form
          class="text-center border border-primary p-5"
          style="margin-top: 70px; height: auto; padding-top: 100px !important"
          @submit.prevent="addUser"
        >
          <input
            type="text"
            id="firstName"
            class="form-control mb-5"
            placeholder="Eesnimi"
            v-model="user.firstName"
            required
          />
          <input
            type="text"
            id="lastName"
            class="form-control mb-5"
            placeholder="Perekonnanimi"
            v-model="user.lastName"
            required
          />
          <!-- Vanus -->
          <input
            type="number"
            id="age"
            class="form-control mb-5"
            placeholder="Vanus"
            v-model="user.age"
          />
          <input
            type="email"
            id="email"
            class="form-control mb-5"
            placeholder="E-mail"
            v-model="user.email"
            required
          />
          <!-- Password -->
          <input
            type="password"
            id="password"
            class="form-control mb-5"
            placeholder="Parool"
            v-model="user.password"
          />
          <p>
            Oled juba kasutaja ? Sisse logimiseks
            <router-link to="/"> kliki siia</router-link>
            <!-- Sign in button -->
            <center>
              <button class="btn btn-primary btn-block w-75 my-4" type="submit">
                Registreeri kasutajaks
              </button>
            </center>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "add",
  data() {
    return {
      user: {
        firstName: "",
        lastName: "",
        email: "", //tegemist formiga, tühi string, kuhu läheb sisestatud tekst formilt
        password: "",
      },
      errorMessage: "",
    };
  },
  methods: {
    headers: { authorization: "Bearer " + localStorage.getItem("jwt") },
    addUser() {
      let newUser = {
        //teeme uued muutujad, kõikide product tabeli väljadega, mida formil kuvada väljadena
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email, //tegemist formiga, tühi string, kuhu läheb sisestatud tekst formilt
        password: this.user.password,
        age: this.user.age,
      };
      console.log(newUser);
      this.submitToServer(newUser); //kutsun välja kõik sisestatud tekstid koos newproduct väljadega
    },
    async submitToServer(data) {
      //kutsun üleval välja, võtab uue meetodiga uue data
      const user = await  axios.post('api/user', data) //suuname back endi , kasutan async await fn sest kasutada
      console.log("users", user);
      this.$router.push("/login");


      /* MEETOD 1
        url: 'api/user', 
        method: "POST", 
        data: data
      /*

      MEETOD 2
      submitToServer(data) {
      axios

        .post("api/user", data) //suuname back endi
        .then((response) => {
          console.log(response);
          this.$router.push("/login");
        })
        .catch((error) => {
          console.log(error.message);
        }); */
    },
  },
};
</script>
       