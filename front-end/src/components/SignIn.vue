<template>
<transition v-if="show" name="modal">
  <div class="modal-mask">
    <div class="modal-container">
      <div class="background">
        <div class="hero">
          <div class="heroBox">
            <form class="pure-form">
            <fieldset>
                <legend>Register for an account</legend>
                <input placeholder="first name" v-model="firstName">
                <input placeholder="last name" v-model="lastName">
            </fieldset>
            <fieldset>
                <input placeholder="username" v-model="username">
                <input type="password" placeholder="password" v-model="password">
            </fieldset>
            <fieldset>
                <button type="submit" class="pure-button pure-button-primary" @click.prevent="register">Register</button>
            </fieldset>
            </form>
            <p v-if="error" class="error">{{error}}</p>
            <form class="pure-form space-above">
            <fieldset>
                <legend>Login</legend>
                <input placeholder="username" v-model="usernameLogin">
                <input type="password" placeholder="password" v-model="passwordLogin">
            </fieldset>
            <fieldset>
                <button type="submit" class="pure-button pure-button-primary" @click.prevent="login">Login</button>
            </fieldset>
            </form>
            <p v-if="errorLogin" class="error">{{errorLogin}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</transition>
</template>

<script>
import axios from 'axios';
export default {
  name: 'SignIn',
  props: {
    show: Boolean,
  },
  data() {
    return {
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            usernameLogin: '',
            passwordLogin: '',
            error: '',
            errorLogin: ''
        }
  },
  methods: {
  close() {
    this.$emit('close');
  },
  async register() {
      this.error = '';
      this.errorLogin = '';
      if (!this.firstName || !this.lastName || !this.username || !this.password)
        return;
      try {
        let response = await axios.post('/api/users', {
          firstName: this.firstName,
          lastName: this.lastName,
          username: this.username,
          password: this.password,
        });
        this.$root.$data.user = response.data.user;
        this.firstName = "";
        this.lastName = "";
        this.username = "";
        this.password = "";
        this.$emit('uploadFinished');
      } catch (error) {
        this.error = error.response.data.message;
        this.$root.$data.user = null;
      }
    },
    async login() {
      this.error = '';
      this.errorLogin = '';
      if (!this.usernameLogin || !this.passwordLogin)
        return;
      try {
        let response = await axios.post('/api/users/login', {
          username: this.usernameLogin,
          password: this.passwordLogin,
        });
        this.$root.$data.user = response.data.user;
        this.usernameLogin = "";
        this.passwordLogin = "";
        this.$emit('uploadFinished');
      } catch (error) {
        this.errorLogin = "Error: " + error.response.data.message;
        this.$root.$data.user = null;
      }
    },
  }
}
</script>


<style scoped>
/* Modals */
.modal-mask {
  position: absolute;
  z-index: 9998;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* width: 100%;
  height: 100%; */
  /* background-color: rgba(0, 0, 0, .3); */
  transition: opacity 0.5s ease;
  display: flex;
  transition: background 0.2s ease-in-out, height 1s ease-in-out;
  transition: height 0.2s ease-in-out, width 0.2s ease-in-out;
  justify-content: center;
  transition-timing-function: cubic-bezier(0.64, 0.57, 0.67, 1.53);
}

.modal-container {
  width: max-content;
  height: max-content;
  margin-top: 50px;
  padding: 10px 10px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all 0.5s ease;
  display:flex;
  justify-content: center;
  align-items: center;
}

/*
* The following styles are auto-applied to elements with
* transition="modal" when their visibility is toggled
* by Vue.js.
*
* You can easily play with the modal transition by editing
* these styles.
*/
.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

/* Form */


.placeholder {
  background: #F0F0F0;
  width: 200px;
  height: 125px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
  font-size: 14px;
  cursor: pointer;
}

.placeholder:hover {
  background: #E0E0E0;
}

.buttons {
  display: flex;
  justify-content: space-between;
}

.space-above {
  margin-top: 50px;
}

h1 {
  font-size: 28px;
  font-variant: capitalize;
}

.hero {
  padding: 80px;
  display: flex;
  justify-content: center;
}

.heroBox {
  text-align: center;
}

.hero form {
  font-size: 14px;
}

.hero form legend {
  font-size: 20px;
}

button {
    background-color: #2B425C;
}

legend {
    color: white;
}

input {
  margin-right: 10px;
  align-self: center;
  color:#2B425C;
}

.error {
  margin-top: 10px;
  display: inline;
  padding: 5px 20px;
  border-radius: 30px;
  font-size: 10px;
  background-color: #d9534f;
  color: #fff;
}

.background {
    background-image: url("../../images/EFFECTS.jpg");
    width: 500px;
    height: auto;
    margin: 50px;
    border-radius: 30px;
    background-position: center;
    display:flex;
    justify-content: center;
    align-items: center;
}

.login {
    display:flex;
    justify-content: center;
}

@media screen and (max-width: 600px) {
  .background {
    width: max-content;
  }
}
</style>