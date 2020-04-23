<template>
    <div class="post">
        <h1 class="photoTitle">{{post.title}}</h1>
        <div class="post-content">
            <div class="img-container">
                <img :src="post.path" />
            </div>
            <div class="postText">
                <div class="photoInfo">         
                    <p class="photoName">Written by {{post.user.firstName}} {{post.user.lastName}} in {{post.location}}</p>
                    <p class="photoDate">{{formatPostDate(post.created)}}</p>
                </div>            
                <div class="photoDescription">
                    <h3 class="description">{{post.blurb}}</h3>
                </div>
            </div>
        </div>
        <div class="comment-container">
            <h2>Comments</h2>
            <div class="create-comment" v-if="user">
                <form class="pure-form" @submit.prevent="addComment">       
                <fieldset>
                    <textarea v-model="commentText"></textarea>
                    <br />
                    <button class="pure-button pure-button-primary" type="submit">Submit</button>
                </fieldset>
            </form>
            </div>      
            <div v-for="comment in comments" v-bind:key="comment._id">
                <div class="comment-section">
                    <div class="comment">
                    <p class="comment-text">{{comment.text}}</p>
                    <p class="comment-name">{{comment.user.firstName}} {{comment.user.lastName}}</p>
                    <p class="comment-created">{{formatDate(comment.created)}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import axios from 'axios'
import moment from 'moment'
export default {
    name: "Post",
    components: {},
    data() {
        return {
            commentText: '',
            post: null,
            comments:[],
        }
    },
    created() {
        this.checkAuth();
        this.getPost();
        this.getComments();
    },
    computed: {
      user() {
        return this.$root.$data.user;
      }
    },
    methods: {
        async checkAuth() {
            try {
                let response = await axios.get('/api/users');
                this.$root.$data.user = response.data.user;
            } catch (error) {
                this.$root.$data.user = null;
            }
        },
        async getPost() {
            try {
                this.response = await axios.get("/api/posts/" + this.$route.params.id);
                console.log(this.response.data)
                this.post = this.response.data;
            } catch (error) {
                console.log(error);
            }
        },
        formatPostDate(date) {
            return moment(date).format('DD MMMM YYYY');
        },
        formatDate(date) {
            if (moment(date).diff(Date.now(), 'days') < 15)
                return moment(date).fromNow();
            else
                return moment(date).format('d MMMM YYYY');
        },
        async addComment() {
            try {
                await axios.post("/api/comments", {
                    text: this.commentText,
                    post: this.$route.params.id,
                });
                this.commentText = "";
                this.creating = false;
                this.getComments();
                return true;
            } catch (error) {
                console.log(error);
            }
        },
        async getComments() {
            try {
                let response = await axios.get("/api/comments/post/" + this.$route.params.id);
                this.comments = response.data;
                return true;
            } catch (error) {
                console.log(error);
            }
        },
    }
}
</script>


<style scoped>
.post {
    margin-top: 10px;
    display:flex;
    flex-direction: column;
    /*justify-content: center;
    align-items: center;*/
}

.img-container {
    display: flex;
    justify-content: center;
    padding-bottom: 10px;
}

.img-container img {
    max-width: 400px;
    height: auto;
}

.photoInfo {
  padding-top:10px;
  padding-bottom: 10px;
  display: flex;
  justify-content: space-between;
  font-size: 1em;
}

.photoTitle{
  font-family: 'Permanent Marker', cursive;
  margin:20px;
  padding-left: 30px;
}

.photoInfo p {
  margin: 0px;
}

.photoDate {
  font-size: 0.8em;
  font-weight: normal;
}

.postText {
    display: flex;
    flex-direction: column;
    padding: 20px;
    padding-right:80px;
}

.photoDescription {
    text-align: left;
    margin-left: 10px;
}

.post-content {
    display: flex;
    flex-direction: row;
    width: 90%;
    justify-content: center;
    align-items: flex-start;
    align-self: center;
    padding: 10px 50px;
}

p {
  margin: 0px;
}

textarea {
    padding: 40px;
    margin: 5px;
}

.photoDescription {
    display: flex;
    justify-content: center;
}

.comment-container h2 {
    font-family: 'Permanent Marker', cursive;
}

.comment-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding-left: 50px;
    padding-top: 20px;
}

.comment-section {
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.create-comment textarea {
    width: 60%;
    padding: 10px;
}

.create-comment button {
    background-color: #2B425C;
}

.comment {
    padding: 10px;
    text-align: left;
    width: 60%;
    background-color: white;
    border-radius: 12px;
    margin: 10px;
}

.comment-text {
    font-size: 1.2em;
}

.comment-name {
    font-size: 1em;
}

.comment-created {
    font-size: 1em;
}
</style>