<template>
  <div>
    <h2 class="mb-3">Tellimused</h2>
    <!-- <p>Count: {{ count }}</p>
    <button @click="addCount()">+</button>
    <button @click="removeCount()">-</button> -->
    <b-table striped hover :items="items" :fields="fields">
      <template #cell(price)="data">
        <b>{{ data.value }} EUR</b>
      </template>

      <template #cell(orderDate)="data">
        <b>{{ $moment(data.value).format("DD.MM.YYYY hh:mm") }}</b>
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
  name: "Orders",
  data() {
    return {
      count: 0,
      fields: [
        { key: "orderNumber", label: "Tellimuse number" },
        { key: "orderDate", label: "Tellimuse kuupäev" },
         { key: "status", label: "Tellimuse staatus" },
        { key: "Tooted", label: "Tooted" },
        { key: "price", label: "Toote hind" },
      ],
      items: [],

      productFields: [
        { key: "category", label: "Kategooria" },
        { key: "productCode", label: "Tootekood" },
        { key: "name", label: "Toote nimi" },
        { key: "weight", label: "Toote kaal (G)" },
        { key: "price", label: "Toote hind (EUR)" },
        { key: "kgprice", label: "Kg hind (EUR)" },
        { key: "amount", label: "Kogus (TK)" },
      ],
      productItems: [],
      productTableTitle: "Pealkiri",
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
      this.productTableTitle = item.orderNumber; //toob headeri üles nurka
    },
    /**addCount() {
      console.log("Praegune count: ", this.count);
      this.count++;
    },
    removeCount() {
      console.log("Eelmine count: ", this.count);
      this.count--;
    },**/
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
