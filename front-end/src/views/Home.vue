<template>
  <div class="home">
    <div class="row">
      <div class="leftcolumn">
        <div class="image" v-for="post in posts" v-bind:key="post._id">
          <router-link :to=" '/post/' + post._id "><img :src="post.path" /></router-link>
          <p class="photoTitle">{{post.title}}</p>
          <div class="photoInfo">
            <p class="photoName">{{post.user.firstName}} {{post.user.lastName}}</p>
            <p class="photoDate">{{formatDate(post.created)}}</p>
          </div>
        </div>
      </div>
      <div class="rightcolumn">
        <div class="card">
          <div class="contact">
            <div class="contact-banner">
                <p>About Me</p>
            </div>
            <div class="contact-photo">
                <img src="../../images/author.jpg" />
            </div>
            <div class="contact-info">
                <div class="name">
                    <p>Autumn Clark</p>
                </div>
                <div class="contact-text">
                    <p>As a college student, I don't have the luxury of eating well and traveling often just yet. 
                      But I make up for it by scavenging for food like a boss and going as hard as possible when I do 
                      get around to traveling. ;)
                    </p>
                    <p>
                      This blog is where I detail all of my successes (and misadventures) of pursuing my goal of 
                      eating often, and traveling well.
                    </p>
                </div>
            </div>
            <div class="contact-banner">
                <p>Thanks for coming!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import moment from 'moment';
import axios from 'axios';
export default {
  name: 'Home',
  components: {
  },
  data() {
    return {
      posts: [],
      error: ''
    }
  },
  created() {
    this.getPosts();
  },
  methods: {
    async getPosts() {
      try {
        let response = await axios.get("/api/posts");
        this.posts = response.data;
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
    formatDate(date) {
            return moment(date).format('DD MMMM YYYY');
        },
  }
}
</script>

<style scoped>
/* Create two unequal columns that floats next to each other */
/* Left column */
.leftcolumn {
  /* display: flex;
  flex-direction: column; */
  flex: 2;
  padding-left: 20px;
  margin-top: 20px;
  order: 1;
}

/* Right column */
.rightcolumn {
  display:flex;
  flex-direction: column;
  align-items: center;
  flex:1;
  padding-left: 20px;
  margin-right:0px;
  padding-right:20px;
  order: 2;
}

/* Fake image */
.fakeimg {
  background-color: #aaa;
  width: 100%;
  padding: 20px;
}

/* Add a card effect for articles */
.card {
  background-color: white;
  padding: 20px;
  margin-top: 20px;
  display:flex;
  align-items: center;
  justify-content: center;
}

.row {
  display: flex;
}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: flex;
  clear: both;
}

/* Footer */
.footer {
  padding: 20px;
  text-align: center;
  background: #ddd;
  margin-top: 20px;
}

.contact {
    width: 90%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items:center;
    color:black;
    text-align: center;
}

.contact-banner {
    background-color: #6F9EC6;
    width: 100%;
    height:40px;
    display:flex;
    justify-content: center;
    align-items:center
}

.contact-banner p {
  font-weight: bold; 
  font-family: 'Quicksand', sans-serif;
}

.contact-photo {
    height: 200px;
}

.contact-photo img{
    height: 150px;
    width: auto;
    border-radius: 75px;
    margin:30px;
}

.contact-info {
  padding: 0px;
  margin-bottom: 10px;
}

.name {
    font-family: 'Permanent Marker', cursive;
    font-size: 1.4em;
    font-weight:bold;
    margin-bottom: 10px;
}

.contact-text {
  font-family: 'Quicksand', sans-serif;
}

.photoInfo {
  font-size: 0.8em;
}

.photoInfo p {
  margin: 0px;
}

.photoDate {
  font-size: 0.7em;
  font-weight: normal;
}

p {
  margin: 0px;
}

/* Masonry */
*,
*:before,
*:after {
  box-sizing: inherit;
}

.image-gallery {
  column-gap: 1em;
}

.image {
  margin: 0 0 1.5em;
  display: inline-block;
  width: 100%;
}

.image img {
  max-width:350px;
  height: auto;
  padding: 10px;
  background-color: white;
}

/* Masonry on large screens */
@media only screen and (min-width: 1024px) {
  .leftcolumn {
    column-count: 2;
  }
}



/* Responsive layout - when the screen is less than 800px wide, make the two columns stack on top of each other instead of next to each other */
@media screen and (max-width: 800px) {
  .leftcolumn, .rightcolumn {
    width: 100%;
    padding: 0;
  }

  .leftcolumn {
    column-count: 1;
  }

  .row {
    flex-direction: column;
  }
}
</style>