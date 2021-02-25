<template>
  <div>
    <div class="col-md-12 form-wrapper">
      <h2>Lisa või muuda toodet!</h2>
      <br />
      <form id="create-post-form">
        <div class="form-group col-md-12">
          <label>Nimi: </label>
          <input
            type="text"
            id="name"
            v-model="product.name"
            name="title"
            class="form-control"
            placeholder="Maasikamoos"
          />
        </div>

        <div class="form-group col-md-12">
          <label> Bränd: </label>
          <input
            type="text"
            id="brandname"
            v-model="product.brandname"
            name="title"
            class="form-control"
            placeholder="MEIE MARI"
          />
        </div>

        <div class="form-group col-md-12">
          <label> Tootekood: </label>
          <input
            type="text"
            id="email"
            v-model="product.productCode"
            name="title"
            class="form-control"
            placeholder="4564845093746"
          />
        </div>

        <div class="form-group col-md-12">
          <label> Kategooria: </label>
          <input
            type="text"
            id="category"
            v-model="product.category"
            name="title"
            class="form-control"
            placeholder="Moosid ja Püreed"
          />
        </div>

        <div class="form-group col-md-12">
          <label> Toote kaal (g): </label>
          <input
            type="number"
            id="weight"
            v-model="product.weight"
            name="title"
            class="form-control"
            placeholder="350"
          />
        </div>

        <div class="form-group col-md-12">
          <label> Kg hind (€/kg): </label>
          <input
            type="number"
            id="kgprice"
            v-model="product.kgprice"
            name="description"
            class="form-control"
            placeholder="7.71"
          />
        </div>

        <div class="form-group col-md-12">
          <label> Hind(€) : </label>
          <input
            type="number"
            id="price"
            v-model="product.price"
            name="description"
            class="form-control"
            placeholder="2.7"
          />
        </div>

        <div class="form-group col-md-6">
          <label> Toote info: </label>
          <input
            type="text"
            id="notes"
            v-model="product.notes"
            name="description"
            class="form-control"
            placeholder="Turul aastast 2019"
          />
        </div>

        <br />
        <b-button size="sm" variant="outline-primary" margin-right="20px" @click="addProduct">Lisa!</b-button> 
        
        <b-button size="sm" variant="outline-primary" @click="updateProduct">Uuenda toode!</b-button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "add",
  props: { // see on see mille kaudu edastan NewProduct komponendile andmed, ehk modalist edastan siia ehk defineerin muutujad, mida , saan updateproductst anda kaasa infot newproductisse, parent componendile annan children (newProduct) compnentisdele
    //data nimetused nimetused peavad oelma erinevad, määran tüübi ära, kas object või array, req ei tohi panna
    productProps: Object, //propi väärtusele saan ligi this.productProps
  },
  data() {
    return {
      product: {
        name: "", //tegemist formiga, tühi string, kuhu läheb sisestatud tekst formilt
        brandname: "",
        productCode: "",
        category: "",
        weight: "",
        kgprice: "",
        price: "",
        notes: "",
        ...this.productProps, //kopeerib product Props väljad productisse
      },
    };
  },
  async created() {
    console.log(this.productProps);
  },
  methods: {
    addProduct() { 
      let newProduct = {  //teeme uued muutujad, kõikide product tabeli väljadega, mida formil kuvada väljadena
        name: this.product.name,
        brandname: this.product.brandname,
        productCode: this.product.productCode,
        category: this.product.category,
        weight: this.product.weight,
        kgprice: this.product.kgprice,
        price: this.product.price,
        notes: this.product.notes,
      };
      console.log(newProduct);
      this.submitToServer(newProduct); //kutsun välja kõik sisestatud tekstid koos newproduct väljadega
    },

    submitToServer(data) { //kutsun üleval välja, võtab uue meetodiga uue data
      axios
        .post("api/product", data, {
        headers: { authorization: "Bearer " + localStorage.getItem("jwt") },
        }) //suuname back endi
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
    //---toote muutmine---
    updateProduct() {
      console.log("Olen updateProductis");
      let id = this.productProps.id;
      axios
        .post("/api/product/" + id, this.product, {
        headers: { authorization: "Bearer " + localStorage.getItem("jwt") },
        }) //3 parameetrit, url, toode ja headers
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>