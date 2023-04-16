<template>
  <div class='px-5 w-100'>
    <h3>{{$store.state.vocabulary_sets.currentVocabSet.title}}</h3>
    <div class='mt-3 d-flex w-100'>
      <div style='width: 75%; margin-right: 3%;'>
        <b-form-group
          id="input-group-1"
          label="Tên bộ từ"
          label-for="title"
          class='font-weight-bold '
        >
          <b-form-input
            id="title"
            v-model="title"
            placeholder="Nhập tên của bộ từ"
            class='border-top-0 border-left-0 border-right-0 border-bottom-2 rounded-0'
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-group-1"
          label="Mô tả bộ từ"
          label-for="description"
          class='font-weight-bold '
        >
          <b-form-input
            id="description"
            v-model="description"
            placeholder="Nhập mô tả của bộ từ"
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
  name: 'edit vocab set',
  data() {
    return {
      title: '',
      description: '',
      language: 'English',
      image: '',
      isOpenImage: true,
    }
  },
  methods: {
    updateVocabSet() {
      const createVocabSetPayload = {
        id: this.$store.state.vocabulary_sets.currentId,
        title: this.title,
        description: this.description,
        avatar_image: this.image,
        created_user_id: this.$auth.user.id,
      }
      this.$store.dispatch('vocabulary_sets/updateVocabSet', createVocabSetPayload).then((response) => {
        if(response.data.success) {
          Swal.fire({
            title: 'Thông báo',
            text: response.data.message,
            showConfirmButton: false,
            timer: 1500,
            icon: 'success',
          })
          this.title = '';
          this.description = '';
          this.image = '';
          this.$store.commit('vocabulary_sets/RESET_VOCAB_SETS')
          this.$router.push('/individual-vocab-sets')
        }
      })
    },
    showVocabSet() {
      this.$store.dispatch('vocabulary_sets/getSet', this.$store.state.vocabulary_sets.currentId).then((response) => {
        if(response.data.success) {
          this.title = response.data.data.vocabulary[0].title
          this.description = response.data.data.vocabulary[0].description
          this.image = response.data.data.vocabulary[0].avatar_image
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
