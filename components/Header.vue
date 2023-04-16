<template>
  <div class="position-fixed w-100 bg-white" style='z-index: 10;'>
    <b-navbar toggleable="lg">

      <b-navbar-brand><nuxt-link style='color: black' to='/'><b-avatar variant="warning">B</b-avatar> BeeboVocab</nuxt-link></b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item v-if='!this.$auth.user' class='font-weight-bold text-black-100' href='#about-us'>Về chúng tôi</b-nav-item>
          <b-nav-item v-if='!this.$auth.user' class='font-weight-bold text-black-100' href='#contact-us'>Liên hệ</b-nav-item>

          <nuxt-link @click.native="toggleCurr" to='manage-topics' v-if='this.$auth.user && $auth.user.role === "admin"' class='font-weight-bold text-black-50 mt-3'>Chủ đề</nuxt-link>
          <nuxt-link @click.native="toggleCurr" to='manage-users' v-if='this.$auth.user && $auth.user.role === "admin"' class='font-weight-bold text-black-50 mt-3 ml-3'>Người dùng</nuxt-link>

          <b-button v-if='!this.$auth.user' class='ml-3' variant="outline-warning" to="/login">Đăng nhập</b-button>
          <b-button v-if='this.$auth.user && $auth.user.role !== "admin"' class='ml-3 pt-2' :disabled='this.$route.name === "vocab-set-create-vocab-set"' variant="warning" to="vocab-set/create-vocab-set">
            <svg xmlns="http://www.w3.org/2000/svg" class='mb-1' height="24px" viewBox="0 0 24 24" width="24px" fill="#212529"><path d="M0 0h24v24H0V0z" fill="none"/>
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
            </svg>
            <span style='font-size: 20px;' class='pt-5'>Tạo bộ từ</span>
          </b-button>
          <b-nav-item-dropdown right v-if='$auth.user' class='ml-3'>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <b-avatar :src='$auth.user.avatar' />
              <b>{{$auth.user.name}}</b>
            </template>
            <b-dropdown-item><nuxt-link to='/profile' style='color: black; text-underline: none;'>Trang cá nhân</nuxt-link></b-dropdown-item>
            <b-dropdown-item href="#" @click='logout'>Đăng xuất</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCurrentItem: false,
    }
  },
  methods: {
    async logout () {
      await this.$auth.logout();
      await this.$fireModule.auth().signOut()
      await this.$router.push('/login');
    },
    openSidebar() {
      this.$root.$emit('bv::toggle::collapse', 'my-sidebar')
    },
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
  color: #FFC107 !important;
}
</style>
