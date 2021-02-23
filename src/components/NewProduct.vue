<template>
   <div>
        <div class="col-md-12 form-wrapper">
          <h2> Lisa uus toode! </h2>
          <br>
          <form id="create-post-form">
               <div class="form-group col-md-12">
                <label>Nimi: </label>
                <input type="text" id="name" v-model="product.name" name="title" 
                class="form-control" placeholder="Maasikamoos">
               </div>

               <div class="form-group col-md-12">
                <label> Bränd: </label>
                <input type="text" id="brandname" v-model="product.brandname" name="title" 
                class="form-control" placeholder="MEIE MARI">
               </div>

             <div class="form-group col-md-12">
                <label> Tootekood: </label>
                <input type="text" id="email" v-model="product.productCode" name="title" 
                class="form-control" placeholder="4564845093746">
            </div>

            <div class="form-group col-md-12">
                <label> Kategooria: </label>
                <input type="text" id="category" v-model="product.category" name="title" 
                class="form-control" placeholder="Moosid ja Püreed">
            </div>

            <div class="form-group col-md-12">
                <label> Toote kaal (g): </label>
                <input type="number" id="weight" v-model="product.weight" name="title" 
                class="form-control" placeholder="350">
            </div>

              <div class="form-group col-md-12">
                  <label> Kg hind (€/kg): </label>
                  <input type="number" id="kgprice" v-model="product.kgprice" name="description" 
                  class="form-control" placeholder="7.71">
              </div>

              <div class="form-group col-md-12">
                  <label> Hind(€) : </label>
                  <input type="number" id="price" v-model="product.price" name="description" 
                  class="form-control" placeholder="2.7">
              </div>

              <div class="form-group col-md-12">
                  <label> Toote info: </label>
                  <input type="text" id="notes" v-model="product.notes" name="description" 
                  class="form-control" placeholder="Turul aastast 2019">
              </div>

              <br>
                <b-button size="sm" variant="outline-primary" @click="addProduct">Lisa!</b-button>        
          </form>
        </div>
    </div>
</template>

<script>

import axios from 'axios';
export default {
    name: 'add',
    data () {
        return {
            product:{
                name: '', //tegemist formiga, tühi string, kuhu läheb sisestatud tekst formilt
                brandname: '',
                productCode: '',
                category: '',
                weight: '',
                kgprice: '',
                price: '',
                notes: ''
            },
        }},
methods: {
  headers: {authorization: "Bearer " + localStorage.getItem("jwt")},
    addProduct() {
        let newProduct = { //teeme uued muutujad, kõikide product tabeli väljadega, mida formil kuvada väljadena
                name: this.product.name,
                brandname: this.product.brandname,
                productCode: this.product.productCode,
                category: this.product.category,
                weight: this.product.weight,
                kgprice: this.product.kgprice,
                price: this.product.price,
                notes: this.product.notes
        };
        console.log(newProduct);
        this.submitToServer(newProduct) //kutsun välja kõik sisestatud tekstid koos newproduct väljadega
    },
    submitToServer(data) { //kutsun üleval välja, võtab uue meetodiga uue data 
        axios.post('api/product', data) //suuname back endi
            .then((response) => {
                console.log(response);
            })
            .catch ((error) => {
                console.log(error.message)
            });
}}}   
</script>