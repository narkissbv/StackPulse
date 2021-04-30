<template>
  <v-app id="app">
    <IPLookup/>
  </v-app>
</template>

<script>
import IPLookup from '@/components/IPLookup'
// import IPLookup from './components/IPLookup.vue'
export default {
  name: 'App',

  components: {
    IPLookup
  },
  data: () => ({
    //
  })
}
</script>
