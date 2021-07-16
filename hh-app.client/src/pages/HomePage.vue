<template>
  <div class="container-fluid gradient text-white">
    <div class="row banner">
    </div>
    <div class="row justify-content-center mt-3">
      <div class="col-md-8 text-center">
        <h1>Haunted Highway</h1>
      </div>
    </div>
    <div class="row text-center h-50 align-items-center">
      <div class="col-6">
        <button class="btn btn-outline-warning" @click="login">
          Login
        </button>
      </div>
      <div class="col-6">
        <button class="btn btn-outline-warning" @click="logout">
          SignUp
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { AuthService } from '../services/AuthService'
export default {
  setup() {
    return {
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.gradient{
  background: linear-gradient( #0f0c29, #302b63, #24243e);
}
.banner{
  background-image: url("https://images-na.ssl-images-amazon.com/images/I/91vZTSbuF8L._RI_.jpg");
  background-size: cover;
  background-position: center;
  border-bottom: solid 3px white;
  height: 35vh;
}
</style>
