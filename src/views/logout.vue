<template>
  <div>
    <!--Esialgu Log out Button eraldi lehel
    <b-button size="sm" variant="outline-primary" @click="logOut"
      >Logi välja!</b-button
    > 
    <div class="col-md-12">
      {{ errorMessage }}
    </div>-->
  </div>
</template>

<script>
export default {
  name: "logout",
  data() {
    return {
      user: {
        email: "", //tegemist formiga, tühi string, kuhu läheb sisestatud tekst formilt
        password: "",
      },
      errorMessage: "",
    };
  },
  created() { //kustun kohe välja logout fn ilma nupule vajutamata
    this.logOut()
  },
  methods: {
    logOut() {
      localStorage.removeItem("jwt");
      localStorage.removeItem("accessType");
      this.$router.push("/"); // kui logimine õnnestub suuname ümber teisele routile
    },
  },
};
</script>