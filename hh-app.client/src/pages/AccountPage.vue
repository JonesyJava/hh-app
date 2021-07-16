<template>
  <div class="container-fluid dark text-white">
    <div class="row mt-4">
      <div class="col-4">
        <img class="profile" :src="account.picture" alt="" />
      </div>
      <div class="col-4 offset-2">
        <p>{{ account.name.split('@')[0] }}</p>
        <!-- <p>{{ account. }}</p> -->
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-12 text-center">
        badges:
      </div>
    </div>
    <div class="row text-center bottom">
      <div class="col-4">
        <router-link :to="{name: 'Map'}">
          <button class="btn btn-info">
            Map
          </button>
        </router-link>
      </div>
      <div class="col-4">
        <button class="btn btn-danger">
          Top
        </button>
      </div>
      <div class="col-4">
        <button class="btn btn-warning">
          hall
        </button>
      </div>
    </div>
    <!-- <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p> -->
  </div>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
export default {
  name: 'Account',
  setup() {
    return {
      account: computed(() => AppState.account)
    }
  }
}
</script>

<style scoped>
.dark{
  background-color: #1A1D1A;
}

.bottom{
  position:fixed;
  bottom: 8px;
  width:100%;
}
.profile{
  border-radius: 50%;
}
</style>
