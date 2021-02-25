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
        <b-button
          v-b-modal.modal-1
          size="sm"
          variant="success"
          @click="editOneProduct(data.index)"
          >Uuenda toodet</b-button
        >
      </template>

      <template #cell(deleteProduct)="data">
        <b-button
          size="sm"
          variant="danger"
          @click="deleteProduct(data.item._id, data.index)"
          >Kustuta toode
        </b-button>
      </template>
    </b-table>

    <b-modal id="modal-1" size="small">
      <new-product :productProps="editProduct"></new-product> <!-- editproduct  prop= "items array"[terve editproduct object item] -->
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
import NewProduct from './NewProduct.vue';//impordin NewProducti
export default {
  name: "Products",
  components: { //lisan componendi NewProduct, et saaks kasutada modalit
    NewProduct
  },
  data() {
    return {
      count: 0, //mitu rida tabelisse loob, alguses tühi
      editProduct: null, //data property esialgu null
      fields: [
        { key: "category", label: "Kategooria" }, //key on see, mida muudan ehk key väljad, mida tahan näha
        { key: "brandname", label: "Bränd" },
        { key: "productCode", label: "Toote kood" },
        { key: "name", label: "Nimi" },
        { key: "weight", label: "Kaal (G)" },
        { key: "price", label: "Hind (€)" },
        { key: "kgprice", label: "Kg Hind (€)" },
        { key: "updateProduct", label: "" },
        { key: "deleteProduct", label: "" },
      ],
      items: [], //annab toote väärtused
      itemTabelTitle: "Muuda toodet", 
    };
  },
  async created() { //kui leht tekitatakse, see on päring andmebaasile (get päring postmanis)
    const products = await axios({
      url: "api/products",
      method: "GET",
      headers: { authorization: "Bearer " + localStorage.getItem("jwt") },
    });
    console.log("products", products);
    this.items = products.data.allProducts;
  },
  methods: {
    deleteProduct(id, index) {
      if (confirm("Oled kindel?"))
        axios
          .delete("/api/product/" + id, {
            headers: { authorization: "Bearer " + localStorage.getItem("jwt") },
          }) //pean frondis reaalse värtuse panema
          .then((response) => {
            this.items.splice(index, 1);
            console.log(response);
          })
          .catch((error) => {
            console.log(error.message);
          });
    },
    //Uuenda toodet joaks editOneProduct, mis annab kaasa indexi itemsitest
    editOneProduct(index) {
      this.editProduct = this.items[index];
    },

  },
};
</script>