<template>
  <div class='position-relative'>
    <Header/>
    <div class='d-flex' style='padding-top: 8%;'>
      <sidebar />
      <Nuxt />
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from '~/components/Footer'
import Sidebar from '~/components/Sidebar'
import { SET_TODAY } from '~/store/home/mutation-types'
export default {
  components: { Sidebar, Footer },
  methods: {
  },
  mounted() {
  }
}
</script>
