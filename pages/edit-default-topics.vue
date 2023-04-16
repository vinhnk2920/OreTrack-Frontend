<template>
  <div class='px-5 w-100'>
    <h3>Chỉnh sửa chủ đề</h3>
    <div class='mt-3 d-flex w-100'>
      <div style='width: 75%; margin-right: 3%;'>
        <b-form-group
          id="input-group-1"
          label="Tên chủ đề"
          label-for="name"
          class='font-weight-bold '
        >
          <b-form-input
            id="name"
            v-model="name"
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
          label-for="image"
          class='font-weight-bold '
          v-if='isOpenImage'
        >
          <b-form-input
            id="image"
            v-model="image"
            placeholder="Nhập địa chỉ ảnh"
            class='border-top-0 border-left-0 border-right-0 border-bottom-2 rounded-0'
            required
          ></b-form-input>
        </b-form-group>
      </div>
      <div style='width: 22%;'>
        <b-button class='w-100 bg-white mt-4 p-0' style='border: 2px dashed gray; height: 75%;' @click='isOpenImage = !isOpenImage'>
          <img :src='image' style='max-width: 227px; max-height: 189px;' />
        </b-button>
      </div>
    </div>
    <div class='mt-5'>
      <b-button variant='warning' class='font-weight-bold btn-create' @click='updateVocabSet'>Cập nhật bộ từ</b-button>
    </div>
  </div>
</template>
<script>
import Swal from 'sweetalert2'

export default {
  name: 'edit default topics',
  data() {
    return {
      name: '',
      target: '',
      description: '',
      language: 'English',
      image: '',
      isOpenImage: true,
    }
  },
  methods: {
    updateVocabSet() {
      const updatePayload = {
        id:  this.$store.state.vocabulary_sets.currentTopic,
        name: this.name,
        target: this.target,
        description: this.description,
        image: this.image,
      }
      this.$store.dispatch('vocabulary_sets/updateDefaultTopic', updatePayload).then((response) => {
        if(response.data.success) {
          Swal.fire({
            title: 'Thông báo',
            text: response.data.message,
            showConfirmButton: false,
            timer: 1500,
            icon: 'success',
          })
          this.name = '';
          this.target = '';
          this.description = '';
          this.image = '';
          this.$router.push('/manage-topics')
        }
      })
    },
    showVocabSet() {
      this.$store.dispatch('vocabulary_sets/findTopicById', this.$store.state.vocabulary_sets.currentTopic).then((response) => {
        if(response.data.success) {
          this.name = response.data.topic[0].name
          this.target = response.data.topic[0].target
          this.description = response.data.topic[0].description
          this.image = response.data.topic[0].image
        } else  {
          Swal.fire({
            title: 'Thông báo',
            text: response.data.message,
            showConfirmButton: false,
            timer: 1500,
            icon: 'error',
          })
        }
      })
    }
  },
  mounted() {
    this.showVocabSet()
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
