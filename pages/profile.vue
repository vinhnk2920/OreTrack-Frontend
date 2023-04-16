<template>
  <div class='px-5 w-100 d-flex'>
    <div style='width: 70%;' class='rounded-lg shadow'>
      <div class=" w-100 rounded-lg">
        <div class="card w-100 rounded-lg">
          <div class="w-100 position-relative">
            <div class='position-absolute d-flex w-100' style='margin-top: 13%; z-index: 10;'>
              <div>
                <b-avatar class="profile ml-5" style='border: 10px solid white ; width: 150px; height: 150px;'><img :src="$auth.user.avatar" alt=''></b-avatar>
              </div>
              <div style='margin-top: 11%;' class='d-flex justify-content-between w-100 px-3'>
                <h4>{{$auth.user.name}}</h4>
                <button class='border border-warning bg-warning rounded-lg px-4 py-1' style='font-size: 18px; height: 50%;'>Chỉnh sửa</button>
              </div>
            </div>
            <div class='position-absolute w-100'>
              <img src="https://upload.wikimedia.org/wikipedia/commons/6/67/Yellow-maple.jpg" class='w-100 rounded-lg' style='height: 160px;' alt=''>
            </div>
          </div>
        </div>
<!--        <div style='margin-top: 35%;' class='px-5 mb-3'>-->
<!--          <BarChart />-->
<!--        </div>-->
      </div>
    </div>
    <div style='width: 28%; background-color: #FDFDFD; margin-left: 2%;' class='card px-3 py-3'>
      <h3>Danh sách bạn bè</h3>
      <div class='my-3'>
          <label class="sr-only" for="inlineFormInputGroup">Username</label>
          <div class="input-group mb-2">
            <div class="input-group-prepend" @click='findFriendByPhoneOrEmail'>
              <div class="input-group-text"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
              </svg></div>
            </div>
            <input type="text" @keyup.enter='findFriendByPhoneOrEmail' v-model='findFriend' class="form-control" id="inlineFormInputGroup" placeholder="Số điện thoại/email">
          </div>
      </div>
      <div v-for='friend in friendList' :key='friend.id' class='d-flex bg-warning py-3 rounded-lg mb-4 pl-3 shadow'>
        <div>
          <b-avatar :src='friend.avatar'/>
        </div>
        <div class='text-left ml-3 mt-1 d-flex w-100'>
          <div class='w-75'>
            <h6 class='p-0 m-0'>{{friend.name}}</h6>
          </div>
          <div v-if='friend.status === 1' class='w-25'>
            <button class='border-0 btn-warning rounded-lg' @click='deleteFriend'>
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
              </svg>
            </button>
          </div>
          <div v-else>
            <div v-if='friendStatus == null' class='w-25'>
              <button class='border-0 bg-warning rounded-lg px-1 py-1' @click='addFriend'>
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-person-plus" viewBox="0 0 16 16">
                  <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                  <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
                </svg>
              </button>
            </div>
            <div v-if='friendStatus === 0' class='w-25' @click='deleteFriend'>
              <button class='border-0 bg-warning rounded-lg px-1 py-1'>
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-person-dash" viewBox="0 0 16 16">
                  <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                  <path fill-rule="evenodd" d="M11 7.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5z"/>
                </svg>
              </button>
            </div>
            <div v-if='friendStatus === -1' class='w-25'>
              <button class='border-0 btn-warning rounded-lg' @click='acceptFriend'>
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-check2" viewBox="0 0 16 16">
                  <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                </svg>
              </button>
              <button class='border-0 btn-warning rounded-lg' @click='deleteFriend'>
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BarChart from '~/components/BarChart'
import Swal from 'sweetalert2'
export default {
  name: 'profile',
  components: { BarChart },
  data() {
    return {
      friendList: [],
      findFriend: '',
      friendStatus: null,
    }
  },
  methods: {
    findFriendByPhoneOrEmail() {
      if (this.findFriend) {
        if (this.findFriend.indexOf('@') === -1) {
          this.$store.dispatch('vocabulary_sets/findFriend', {phone: this.findFriend, request_id: this.$auth.user.id}).then((response) => {
            if (response.data.success) {
              this.friendList = response.data.data
              this.friendStatus = response.data.status
            } else {
              this.friendList = []
            }
          })
        }
      } else {
        this.showFriends()
      }
    },
    addFriend() {
      this.$store.dispatch('vocabulary_sets/addFriend', {user_request_id: this.$auth.user.id, user_receive_id: this.friendList[0].id}).then((response) => {
        if (response.data.success) {
          Swal.fire({
            title: 'Thông báo',
            text: response.data.message,
            showConfirmButton: false,
            timer: 1500,
            icon: 'success',
          })
          this.findFriendByPhoneOrEmail()
        } else {
          Swal.fire({
            title: 'Thông báo',
            text: response.data.message,
            showConfirmButton: false,
            timer: 1500,
            icon: 'error',
          })
        }
      })
    },
    deleteFriend() {
      this.$store.dispatch('vocabulary_sets/deleteFriend', {user_request_id: this.$auth.user.id, user_receive_id: this.friendList[0].id}).then((response) => {
        if (response.data.success) {
          Swal.fire({
            title: 'Thông báo',
            text: response.data.message,
            showConfirmButton: false,
            timer: 1500,
            icon: 'success',
          })
          this.showFriends()
        } else {
          Swal.fire({
            title: 'Thông báo',
            text: response.data.message,
            showConfirmButton: false,
            timer: 1500,
            icon: 'error',
          })
        }
      })
    },
    acceptFriend() {
      this.$store.dispatch('vocabulary_sets/updateFriendStatus', {user_request_id: this.$auth.user.id, user_receive_id: this.friendList[0].id, status: 1}).then((response) => {
        if (response.data.success) {
          Swal.fire({
            title: 'Thông báo',
            text: response.data.message,
            showConfirmButton: false,
            timer: 1500,
            icon: 'success',
          })
          this.showFriends()
        } else {
          Swal.fire({
            title: 'Thông báo',
            text: response.data.message,
            showConfirmButton: false,
            timer: 1500,
            icon: 'error',
          })
        }
      })
    },
    showFriends() {
      this.$store.dispatch('vocabulary_sets/showFriend', {user_id: this.$auth.user.id}).then((response) => {
        if (response.data.success) {
          this.friendList = response.data.friends
        }
      })
    }
  },
  mounted() {
    this.showFriends()
  }
}
</script>
<style>
.form-control:active {
  border: 0;
}
</style>
