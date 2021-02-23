<template>
  <div>
    <h2>Kasutajad</h2>
    <b-table striped hover :items="items" :fields="fields">
      <template #cell(email)="data">
        <b>{{ data.value }}</b>
      </template>

      <template #cell(firstName)="data">
        <b>{{ data.value }}</b>
      </template>

      <template #cell(lastName)="data">
        <b>{{ data.value }}</b>
      </template>

      <template #cell(age)="data">
        <b>{{ data.value }}</b>
      </template>

      <template #cell(accessType)="data">
        <span :style="`color: ${getColor(data.value)}`">
          {{ data.value }}
        </span>
      </template>

    </b-table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "users",
  data() {
    return {
      count: 0, //mitu rida tabelisse loob, alguses tühi
      fields: [
        { key: "firstName", label: "Eesnimi" }, //key on see, mida muudan, väljad, mida tahan näha
        { key: "lastName", label: "Perekonnanimi" },
        { key: "email", label: "E-mail" },
        { key: "age", label: "Kasutaja vanus" },
        { key: "accessType", label: "Õigused" },
      ],
      items: [], //peaks tooma kasutaja väärtused
    };
  },
  async created() {
    //see on päring andmebaasile (get päring postmanis)
    const users = await axios({
      url: "api/users",
      method: "GET",
      headers: { authorization: "Bearer " + localStorage.getItem("jwt") },
    });
    console.log("users", users);
    this.items = users.data.allUsers;
  },

  methods: {
    getColor(accessType) {
      if (accessType === "ADMIN") {
        return "green";
      } else {
        return "red";
      }
    },
  },
};
</script>