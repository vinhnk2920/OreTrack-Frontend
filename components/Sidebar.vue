<template>
  <div v-if='$auth.user && $auth.user.role !== "admin"' class='h-100'>
    <div class="d-flex flex-column flex-shrink-0 bg-white shadow">
      <ul class="nav nav-pills nav-flush flex-column mb-auto text-center">
        <li class="nav-item" data-bs-toggle="tooltip" data-bs-placement="right" title="Trang chủ">
          <nuxt-link @click.native="toggleCurr" to='/' style='padding: 35px;' class="sidenav-link nav-link border border-warning">
            <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="#000" class="bi bi-house-heart-fill" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.707L8 2.207l6.646 6.646a.5.5 0 0 0 .708-.707L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5Z"/>
              <path fill-rule="evenodd" d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6Zm0 5.189c1.664-1.673 5.825 1.254 0 5.018-5.825-3.764-1.664-6.691 0-5.018Z"/>
            </svg>
          </nuxt-link>
        </li>
      </ul>
      <ul class="nav nav-pills nav-flush flex-column mb-auto text-center">
        <li class="nav-item" data-bs-toggle="tooltip" data-bs-placement="right" title="Các bộ từ vựng của BeeboVocab">
          <nuxt-link @click.native="toggleCurr" to='/default-topics' style='padding: 35px;' class="sidenav-link nav-link border border-warning">
            <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="#000" class="bi bi-card-checklist" viewBox="0 0 16 16">
              <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
              <path d="M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0zM7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0z"/>
            </svg>
          </nuxt-link>
        </li>
      </ul>
      <ul class="nav nav-pills nav-flush flex-column mb-auto text-center">
        <li class="nav-item" data-bs-toggle="tooltip" data-bs-placement="right" title="Các bộ từ vựng của bạn">
          <nuxt-link @click.native="toggleCurr" to='/individual-vocab-sets' style='padding: 35px;' class="sidenav-link nav-link border border-warning">
            <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="#000" class="bi bi-card-heading" viewBox="0 0 16 16">
              <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
              <path d="M3 8.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm0-5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5v-1z"/>
            </svg>
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Sidebar',
  data() {
    return {
      isCurrentItem: false,
    }
  },
  methods: {
    toggleCurr() {
      this.isCurrentItem = !this.isCurrentItem
    },
  }
}
</script>
<style scoped>
.sidenav-link:hover {
  background-color: #FFC107;
  color: #000000;
}

.nuxt-link-exact-active {
  background-color: #FFC107;
  color: #000000;
}
</style>
