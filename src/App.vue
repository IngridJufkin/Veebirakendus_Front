<template>
<b-container>
  <b-card title="Card Title" no-body>
    <b-card-header header-tag="nav">
      <b-nav card-header pills>
        <b-nav-item v-for="(link, i) in links" :to="link.path" :key="i">{{ link.name }}</b-nav-item>
      </b-nav>
    </b-card-header>

    <b-card-body>
      <router-view/>
    </b-card-body>
  </b-card>
  
</b-container>
</template>

<script>
import { routes } from './routes/router'
  export default {
    data () {
      return {
        links: routes
      }
    }
  }
</script>
