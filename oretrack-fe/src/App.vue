<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header>
      <div>
          <RouterLink to="/" style="display: flex">
              <img alt="Vue logo" class="logo" src="@/assets/AvaCloud.png" />
              <b class="logo-text">ORETRACK</b>
          </RouterLink>
      </div>
      <div>
        <RouterLink to="/login"><button style="margin-right: 1rem;">Login</button></RouterLink>
    </div>
  </header>
  <div>
      <div class="main-screen">
          <img id="map" src="https://os.viettelcloud.vn/oretrack/Vietnam_x16.gif" alt="map">
      </div>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
    background: #0081C9;
    display: flex;
    justify-content: space-between;
}

.logo {
  display: block;
  margin: 2rem 2rem;
    padding: 0.5rem;
  width: 5rem;
    border-radius:50%;
}

.logo-text {
    font-size: 1.3rem;
    font-weight: 700;
    color: white;
    margin-top: 0.5rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

button {
    background-color: white;
    border: none;
    color: black;
    padding: 0.6rem 1.5rem;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    cursor: pointer;
    border-radius: 6px;
}



@media (min-width: 1024px) {
  header {
      width: 100%;
    display: flex;
    place-items: center;
    /*padding-right: calc(var(--section-gap) / 2);*/
  }

  #map {
      width: 100%;
  }

  .logo {
      margin: 0 0 0 0.5rem;
      width: 3rem;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
