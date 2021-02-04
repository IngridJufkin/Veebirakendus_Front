<template>
  <div>
    <h2 class="mb-3">Tellimused</h2>
    <!-- <p>Count: {{ count }}</p>
    <button @click="addCount()">+</button>
    <button @click="removeCount()">-</button> -->
    <b-table striped hover :items="items" :fields="fields">

      <template #cell(price)="data">
        <b class="text-info">{{ data.value }} EUR</b>
      </template>

      <template #cell(Tooted)="data">
        <b-button
          v-b-modal.modal-1
          variant="success"
          @click="showProducts(data.item.products, data.item)" 
          >Vaata tooteid</b-button
        >
      </template>

      <!-- <template #cell(client)="data">
        <b class="text-info">{{ data.value.lastName }}</b>, <b>{{ data.value.firstName }}</b>
      </template> -->
    </b-table>

    <b-modal id="modal-1" :title="productTableTitle" size="xl"> 
      <b-table striped hover :items="productItems" :fields="productFields">
        <template #cell(price)="data">
          <b class="text-info">{{ data.value }} EUR</b>
        </template>
      </b-table>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Orders",
  data() {
    return {
      count: 0,
      fields: [
        { key: "orderNumber", label: "Tellimuse number" },
        "orderDate",
        "status",
        "Tooted",
        "price",
      ],
      items: [],

      productFields: [
        "category",
        "productCode",
        "name",
        "weight",
        "price",
        "kgprice",
        "amount",
      ],
      productItems: [],
      productTableTitle: 'Pealkiri'
    };
  },
  async created() {
    const orders = await axios({
      url: "api/orders",
      method: "GET",
      headers: {},
    });
    console.log("orders", orders);
    this.items = orders.data.allOrders;
  },
  methods: {
    showProducts(products, item) {
      console.log("products", products);
      this.productItems = products;
      this.productTableTitle = item.orderNumber//toob headeri üles nurka
    },
    addCount() {
      console.log("Praegune count: ", this.count);
      this.count++;
    },
    removeCount() {
      console.log("Eelmine count: ", this.count);
      this.count--;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
