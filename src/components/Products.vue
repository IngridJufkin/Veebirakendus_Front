<template>
  <div>
    <h2>Tooted</h2>
    <b-table striped hover :items="items" :fields="fields">
      <template #cell(price)="data">
        <b>{{ data.value }}</b>
      </template>

      <template #cell(weight)="data">
        <b>{{ data.value }}</b>
      </template>

      <template #cell(kgprice)="data">
        <b>{{ data.value }}</b>
      </template>

      <template #cell(category)="data">
        <b>{{ data.value[0] }}</b>
      </template>
    </b-table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Products",
  data() {
    return {
      count: 0, //mitu rida tabelisse loob, alguses tühi
      fields: [
        { key: "category", label: "Kategooria" }, //key on see, mida muudan, väljad, mida tahan näha
        { key: "brandname", label: "Bränd" },
        { key: "productCode", label: "Toote kood" },
        { key: "name", label: "Nimi" },
        { key: "weight", label: "Kaal (G)" },
        { key: "price", label: "Hind (€)" },
        { key: "kgprice", label: "Kg Hind (€)" },
      ],
      items: [], //peaks tooma toote väärtused
    };
  },
  async created() {
    //see on päring andmebaasile (get päring postmanis)
    const products = await axios({
      url: "api/products",
      method: "GET",
      headers: { authorization: "Bearer " + localStorage.getItem("jwt") },
    });
    //console.log("products", products);
    this.items = products.data.allProducts;
  },
};
</script>