<template>
  <div>
    <h2>Muuda/eemalda toode</h2>
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

      <template #cell(updateProduct)="data">
        <b-button v-b-modal.modal-1 size="sm" variant="success"
         @click="updateProduct(data.item._id, data.index)" 
          >Uuenda toodet</b-button
        >
      </template>

      <template #cell(deleteProduct)="data">
        <b-button size="sm" variant="danger"
          @click="deleteProduct(data.item._id, data.index)"
          >Kustuta toode
        </b-button>
      </template>
    </b-table>

    <b-modal id="modal-1" :title="productTableTitle" size="xl">
      <b-table striped hover :items="productItems" :fields="productFields">
        <template #cell(price)="data">
          <b>{{ data.value }}</b>
        </template>

        <template #cell(category)="data">
          <b>{{ data.value[0] }}</b>
        </template>

        <template #cell(kgprice)="data">
          <b>{{ data.value }}</b>
        </template>

        <template #cell(amount)="data">
          <b>{{ data.value }}</b>
        </template>
      </b-table>
    </b-modal>
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
        { key: "updateProduct", label: "" },
        { key: "deleteProduct", label: "" },
      ],
      items: [], //peaks tooma toote väärtused
    };
  },

  async created() { //kui leht tekitatakse
    //see on päring andmebaasile (get päring postmanis)
    const products = await axios({
      url: "api/products",
      method: "GET",
      headers: {authorization: "Bearer " + localStorage.getItem("jwt")},
    });
    console.log("products", products);
    this.items = products.data.allProducts;
  },
  methods: {

   deleteProduct(id, index) {
      if (confirm("Oled kindel?"))
        axios
          .delete("/api/product/" + id) //pean frondis reaalse värtuse panema 
          .then((resp) => {
            this.items.splice(index, 1);
          })
          .catch((error) => {
            console.log(error.message);
          })
    },

       updateProduct(id, index) {
      if (confirm("Oled kindel?"))
      console.log("Olen siin", index)
        axios
          .update("/api/product/" + id) //pean frondis reaalse värtuse panema 
          .then((resp) => {
            this.items.splice(index, 1);
          })
          .catch((error) => {
            console.log(error);
          })
    },
  },
};
</script>