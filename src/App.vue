<template>
  <b-container>
    <b-card title="Card Title" no-body>
      <b-card-header header-tag="nav">
        <b-nav card-header pills>
          <b-nav-item v-for="(link, i) in links" :to="link.path" :key="i">{{
            link.name
          }}</b-nav-item>
        </b-nav>
      </b-card-header>

      <b-card-body>
        <router-view />
      </b-card-body>
    </b-card>
  </b-container>
</template>

<script>
import { routes } from "./routes/router";
export default {
  data() {
    return {
      links: routes, //omistan kõik routsid
    };
  },
  //watchiga same muutujate muutumist jägida
  watch: {
    "$route.name"(value) {
      this.menuLinkCheck();
    },
  }, //
  methods: {
    menuLinkCheck() {
      if (localStorage.getItem("jwt")) {
        console.log("Oleme sees");  
        this.links = routes.filter((route) => {
          if (["Logi sisse", "Registreeri kasutaja"].includes(route.name)) { //kui route.name ei ole üks arrays olev routeritest siis === false
            return false; //tagastame route return route
          } 
           else if (localStorage.getItem('accessType') !== "ADMIN" && ["Uuenda toodet", "Lisa toode"].includes(route.name)) {
             return false //kui accessType poe admin siis ära include-i ehk return false
          }
          else
          return true;
          }
         );
      } else {
        this.links = routes.filter((route) => {
          if (["Logi sisse", "Registreeri kasutaja"].includes(route.name)) {
            //kui route.name on üks arrays olev routeritest siis === true
            return true; //tagastame route
          }
        });
      
        this.$route.path === '/' && this.$router.push({ name: "Logi sisse" });
      }
    },
  },
  //kui komponent luuakse, siis tahame kontrollida kas oleme sisse loginud
  created() {
    this.menuLinkCheck();
  },
};
</script>
