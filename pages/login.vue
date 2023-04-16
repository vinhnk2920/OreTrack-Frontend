<template>
  <section id='login' class='margin-0 bg-warning pt-5 pb-4'>
    <div
      class="px-4 py-5 px-md-5 text-center text-lg-start"
    >
      <div class="container">
        <div class="row gx-lg-5 align-items-center">
          <div class="col-lg-6 mb-5 mb-lg-0">
            <h1 class="my-5 display-3 font-weight-bold ls-tight">
              <span>Develop your</span><br/>
              <span class="bg-white text-back rounded-lg px-2 mt-2">lexicon</span><br/>
              <span>with us!</span>
            </h1>
          </div>

          <div class="col-lg-6 mb-5 mb-lg-0">
            <div class="card">
              <div class="card-body py-5 px-md-5">
                <form>
                  <div class="form-outline mb-4" v-if='!otp_sent'>
                    <label class="form-label font-weight-bold" style='font-size: 2em;' for="phone-number"
                    >Số điện thoại</label
                    >
                    <input
                      v-model='phone' type='text'
                      id="phone-number"
                      class="form-control mt-3"
                    />
                    <button
                      type="submit"
                      class="btn btn-warning font-weight-bold btn-block mb-4 mt-3"
                      id='sign-in-button'
                    >
                      Gửi OTP
                    </button>
                  </div>

                  <div class="form-outline mb-4" v-else>
                    <label class="form-label font-weight-bold" style='font-size: 2em;' for="phone-otp"
                    >Mã OTP 6 chữ số</label
                    >
                    <input
                      v-model='otp' type='text'
                      id="phone-otp"
                      class="form-control mt-3"
                    />
                    <button
                      class="btn btn-block mb-4 btn-warning font-weight-bold mt-3"
                      @click='VerifyOTP'
                    >
                      Xác nhận OTP
                    </button>
                  </div>

                  <!-- Register buttons -->
                  <div class="text-center">
                    <p>hoặc đăng nhập với:</p>
                    <div>
                      <button type='button' class='border-0 bg-white' @click='LoginWithGoogle'>
                        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48' width='48px' height='48px'>
                          <path fill='#FFC107'
                                d='M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z' />
                          <path fill='#FF3D00'
                                d='M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z' />
                          <path fill='#4CAF50'
                                d='M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z' />
                          <path fill='#1976D2'
                                d='M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z' />
                        </svg>
                      </button>
                      <button type='button' class='border-0 bg-white' @click='LoginWithFB'>
                        <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="48px" height="48px"><linearGradient id="Ld6sqrtcxMyckEl6xeDdMa" x1="9.993" x2="40.615" y1="9.993" y2="40.615" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#2aa4f4"/><stop offset="1" stop-color="#007ad9"/></linearGradient><path fill="url(#Ld6sqrtcxMyckEl6xeDdMa)" d="M24,4C12.954,4,4,12.954,4,24s8.954,20,20,20s20-8.954,20-20S35.046,4,24,4z"/><path fill="#fff" d="M26.707,29.301h5.176l0.813-5.258h-5.989v-2.874c0-2.184,0.714-4.121,2.757-4.121h3.283V12.46 c-0.577-0.078-1.797-0.248-4.102-0.248c-4.814,0-7.636,2.542-7.636,8.334v3.498H16.06v5.258h4.948v14.452 C21.988,43.9,22.981,44,24,44c0.921,0,1.82-0.084,2.707-0.204V29.301z"/></svg>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  layout: 'blank-default',
  mounted() {
    console.log(this.$auth.loggedIn)
    if (this.$auth.loggedIn) {
      this.$router.push('/')
    }

    let _this = this
    this.recaptchaVerifier = new this.$fireModule.auth.RecaptchaVerifier('sign-in-button', {
      size: 'invisible',
      callback(response) {
        // console.log('Verify Captcha thành công');
        _this.SendOTP()
      }
    })

    this.recaptchaVerifier.render().then(function(widgetId) {
      window.recaptchaWidgetId = widgetId
    })

    this.$fireModule.auth().onAuthStateChanged(function(user) {
      if (user) {
        user.getIdToken().then(function(idToken) {
          _this.idToken = idToken
          _this.VerifyUser()
          // _this.$fireModule.auth().signOut()
        })
      }
    })

    this.$fire.auth.settings.appVerificationDisabledForTesting = true
  },
  data() {
    return {
      otp_sent: false,
      otp: null,
      phone: null,
      confirmationResult: null,
      idToken: null,
      isLoading: false,
      recaptchaVerifier: null
    }
  },
  methods: {
    SendOTP() {
      const _this = this
      this.isLoading = true
      const phoneNumber = '+84' + this.phone.replace(/^0+/, '')
      const appVerifier = this.recaptchaVerifier
      this.$fire.auth.languageCode = 'vi'
      this.$fire.auth.signInWithPhoneNumber(phoneNumber, appVerifier)
        .then(function(confirmationResult) {
          _this.otp_sent = true
          _this.confirmationResult = confirmationResult
          setTimeout(function() {
            _this.isLoading = false
          }, 2000)
        }).catch(function(error) {
        _this.isLoading = false
        _this.ShowNotify('error', 'Thất bại', 'Số điện thoại không hợp lệ hoặc bạn đã đăng nhập quá nhiều lần trong ngày nên không thể gửi mã OTP!')
      })
    },
    VerifyOTP() {
      const _this = this
      this.isLoading = true
      this.confirmationResult.confirm(this.otp).then(function(result) {
      }).catch(function(error) {
        console.log('OTP sai', error)
        _this.isLoading = false
        _this.ShowNotify('error', 'Thất bại', 'Mã OTP không chính xác')
      })
    },
    VerifyUser() {
      const _this = this
      this.isLoading = true
      this.$auth.loginWith('laravelJWT', {
        data: {
          id_token: this.idToken
        }
      }).then(function() {
        if (_this.$auth.loggedIn) {
          _this.$router.push('/')
        } else {
          this.ShowNotify('error', 'Đăng nhập thất bại', 'Vui lòng thử lại sau')
        }
      }).catch(function() {
        _this.isLoading = false
      })
    },
    LoginWithFB() {
      const provider = new this.$fireModule.auth.FacebookAuthProvider()
      provider.addScope('email')
      this.$fire.auth.languageCode = 'vi_VN'
      provider.setCustomParameters({
        display: 'popup'
      })
      this.$fire.auth.signInWithPopup(provider).then(function(result) {
      }).catch(function(error) {
        console.log(error)
      })
    },
    LoginWithGoogle() {
      console.log('Chay den day')
      const provider = new this.$fireModule.auth.GoogleAuthProvider()
      provider.addScope('email')
      this.$fire.auth.languageCode = 'vi_VN'
      provider.setCustomParameters({
        display: 'popup'
      })
      this.$fire.auth.signInWithPopup(provider).then(function(result) {
      }).catch(function(error) {
        console.log(error)
      })
    },
    ShowNotify(type, title, text) {
      return Swal.fire({
        icon: type,
        title,
        text
      })
    }
  }
}
</script>

<style scoped>
.back-ground {
  background-image: url("https://www.europeanlandowners.org/images/Bee_Award/d0223d5fe31b66e2884cf284484db436.gif");
}

#login {
  display: flex;
  height: 100% !important;
  flex-direction: column;
  flex-wrap: wrap;
}

/*#__nuxt {*/
/*  height: 100%;*/
/*}*/

div#__nuxt {
  margin-top: 5%;
}
</style>
