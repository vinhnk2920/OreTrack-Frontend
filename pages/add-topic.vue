<template>
  <div class='px-5 w-100'>
    <h3>Tạo chủ đề mới</h3>
    <div class='mt-3 d-flex w-100'>
      <div style='width: 75%; margin-right: 3%;'>
        <b-form-group
          id="input-group-1"
          label="Tên chủ đề"
          label-for="title"
          class='font-weight-bold '
        >
          <b-form-input
            id="title"
            v-model="title"
            placeholder="Nhập tên của chủ đề"
            class='border-top-0 border-left-0 border-right-0 border-bottom-2 rounded-0'
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-group-1"
          label="Mục tiêu của chủ đề"
          label-for="target"
          class='font-weight-bold '
        >
          <b-form-input
            id="target"
            v-model="target"
            placeholder="Nhập mục tiêu của chủ đề"
            class='border-top-0 border-left-0 border-right-0 border-bottom-2 rounded-0'
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-group-1"
          label="Mô tả chủ đề"
          label-for="description"
          class='font-weight-bold '
        >
          <b-form-input
            id="description"
            v-model="description"
            placeholder="Nhập mô tả của chủ đề"
            class='border-top-0 border-left-0 border-right-0 border-bottom-2 rounded-0'
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-group-1"
          label="Địa chỉ của ảnh"
          label-for="description"
          class='font-weight-bold '
          v-if='isOpenImage'
        >
          <b-form-input
            id="description"
            v-model="image"
            placeholder="Nhập mô tả của bộ từ"
            class='border-top-0 border-left-0 border-right-0 border-bottom-2 rounded-0'
            required
          ></b-form-input>
        </b-form-group>
      </div>
      <div style='width: 22%;'>
        <b-button class='w-100 bg-white mt-4' style='border: 2px dashed gray; height: 75%;' @click='isOpenImage = !isOpenImage'>
          <svg v-if='!image' xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="gray" class="bi bi-card-image" viewBox="0 0 16 16">
            <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
            <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54A.505.505 0 0 1 1 12.5v-9a.5.5 0 0 1 .5-.5h13z"/>
          </svg>
          <img v-else :src='image' style='width: 100%;' alt='Hình minh họa'/>
        </b-button>
      </div>
    </div>
    <div class='mt-5'>
      <b-button variant='warning' class='font-weight-bold btn-create' @click='createVocabSet'>Tạo chủ đề</b-button>
    </div>
  </div>
</template>
<script>
import Swal from 'sweetalert2'

export default {
  name: 'add topic',
  data() {
    return {
      title: '',
      target: '',
      description: '',
      language: 'English',
      image: '',
      isOpenImage: false,
    }
  },
  methods: {
    createVocabSet() {
      const createVocabSetPayload = {
        name: this.title,
        target: this.target,
        description: this.description,
        image: this.image,
        created_user_id: this.$auth.user.id,
      }
      this.$store.dispatch('vocabulary_sets/createDefaultTopic', createVocabSetPayload).then((response) => {
        if(response.data.success) {
          Swal.fire({
            title: 'Thông báo',
            text: response.data.message,
            showConfirmButton: false,
            timer: 1500,
            icon: 'success',
          })
          this.title = '';
          this.target = '';
          this.description = '';
          this.image = '';
          this.$router.push('/manage-topics')
        } else {
          Swal.fire({
            title: 'Thông báo',
            text: response.data.message,
            showConfirmButton: false,
            timer: 1500,
            icon: 'error',
          })
        }
      }).catch(error => {
        Swal.fire({
          title: 'Thông báo',
          text: "Bạn hãy kiểm tra thông tin nhập vào",
          showConfirmButton: false,
          timer: 1500,
          icon: 'error',
        })
      })
    }
  }
}
</script>
<style scoped>
.btn:active { background-color: red }

.custom-card {
  height: 100px;
}

.btn-create {
  font-size: 18px; margin-left: 82%; width: 190px; height: 65px;
}
</style>
