<template>
  <div id="app">
    <div class="header">
      <div class="header-text">
        <div class="header-logo">
          <h1>Eat Often,</h1>
          <h1> Travel Well</h1>
        </div>
        <div class="header-links">
          <div id="nav">
            <router-link to="/">Home</router-link> 
            <router-link to="/food">Food</router-link>
            <router-link to="/travel">Travel</router-link>
            <div class="loggedIn" v-if="user">
              <p>Hey, {{user.firstName}}</p> <a @click="logout"><i class="fas fa-sign-out-alt"></i></a>
            </div>
            <div class="loggedOut" v-else>
              <a @click="toggleUpload">Login</a>
            </div>
            <signin :show="show" @close="close" @uploadFinished="uploadFinished" />
          </div>
        </div>
      </div>
    </div>  
    <router-view/>
    <div class="footer">
      <a href="https://github.com/autumnpclark/creative-project-4">My Github Repo</a>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import signin from '@/components/SignIn.vue';
export default {
  name: 'App',
  components: {
    signin
  },
  data(){
    return {
      show: false,
      error:'',
    }
  },
  computed: {
    user() {
      return this.$root.$data.user;
    }
  },
  async created() {
      try {
        let response = await axios.get('/api/users');
        this.$root.$data.user = response.data.user;
      } catch (error) {
        this.$root.$data.user = null;
      }
    },
  methods: {
    async logout() {
      try {
        await axios.delete("/api/users");
        this.$root.$data.user = null;
      } catch (error) {
        this.$root.$data.user = null;
      }
    },
    async uploadFinished() {
      this.show = false;
    },
    close() {
      this.show = false;
    },
    toggleUpload() {
      this.show = true;
    },
  }
}
</script>


<style>
#app {
  font-family: 'Quicksand', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: rgb(238, 245, 241);
}

#nav {
  padding: 30px;
  font-family: 'Quicksand', sans-serif;
  display:flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #ffffff99;
  border-radius: 10px;
}

#nav a {
  color: #2c3e50;
  text-decoration: none;
  padding: 0px 20px;
  font-size: 1.5em;
}

#nav a.router-link-exact-active {
  font-weight: bold;
  color:#2B425C
}

#nav a:hover {
  color: rgb(125, 131, 128)
}

.header {
  padding: 0px;
  background-image:url("../images/mountainView.jpg");
  background-repeat: no-repeat;
  height: 400px;
  background-size: cover;
  margin-top: 0px;
}

.header h1 {
  font-family: 'Permanent Marker', cursive;
  margin: 0px;
  color:#252F32;
  font-size: 3em;
  padding: 0px;
}

.header-text {
  padding: 30px;
  color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.header-logo {

}

.footer {
  height:100px;
  background-image: url("../images/footer.jpg");
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
}

.footer a { 
  font-size: 2em;
  color:antiquewhite;
  text-decoration: none;
}

.footer a:hover {
  color: white;
}

.header-links {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}

.loggedIn {
  display:flex;
  align-items: center;
  color: #2c3e50;
  text-decoration: none;
  padding: 0px 20px;
  font-size: 1.5em;
}

.loggedIn p { 
  margin-top: 24px;
  text-align: left;
  align-items: center;
}

.loggedOut {
  display:flex;
}

@media screen and (max-width: 800px) {
  #nav {
    flex-direction: column;
  }
  .header-text {
    flex-direction: column;
  }

  .header-links {
    justify-content: center;
  }

  .header {
    height: max-content;
  }

  .loggedIn {
    flex-direction: column;
  }
}

</style>
