<template>
    <div class="travel">
        <div class="addPost">
            <button v-if="user" class="w3-button w3-black" @click="toggleUpload">+</button>
            <upload v-bind:type="type" :show="show" @close="close" @uploadFinished="uploadFinished" />
            <p>If you can't travel often, travel well</p>
        </div>
        <div class="posts">
            <div class="one-post"  v-for="post in posts" v-bind:key="post._id">
                <router-link :to=" '/post/' + post._id">
                <div class="post-photo">
                    <img :src="post.path" />
                </div>
                <div class="post-info">
                    <div class="post-header">
                        <h2>{{post.title}}</h2>
                        <p>{{post.location}}</p>
                    </div>
                    <p id="travelBlurb">{{post.blurb.substring(0,240) + '...'}}</p>
                    <p>Posted on {{formatDate(post.created)}} by {{post.user.firstName}}</p>
                </div>
                </router-link>
            </div>
        </div>
    </div>
</template>


<script>
import moment from 'moment';
import axios from 'axios';
import Upload from '@/components/Upload.vue';
export default {
    name: 'Travel',
    components: {
        Upload
    },
    data() {
        return {
            show: false,
            type: "Travel",
            posts: []
        }
    },
    created() {
        this.getPosts();
    },
    computed: {
      user() {
        return this.$root.$data.user;
      },
    },
    methods: {
        async getPosts() {
            try {
                this.response = await axios.get("/api/posts");
                this.posts = this.response.data;
                this.posts = this.posts.filter(x => x.type == this.type);
            } catch (error) {
                this.error = error.response.data.message;
            }
        },
        close() {
            this.show = false;
        },
        toggleUpload() {
            this.show = true;
        },
        formatDate(date) {
            return moment(date).format('DD MMMM YYYY');
        },
        async uploadFinished() {
            this.show = false;
            this.getPosts();
        },
    }
}
</script>


<style scoped>


button {
    height: 80px;
    width: 80px;
    font-size: 3.2em;
    background-color: #2B425C;
    margin: 20px;
    padding: 0;
    padding-bottom: 6px;
}

.posts {
    display:flex;
    flex-direction: column;
    align-items: center;
}

.one-post {
    height: max-content;
    width: 80%;
    background-color: white;
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    padding: 20px;
    margin:15px;
}

.one-post img {
    max-height: 250px;
    width: auto;
    max-width: 500px;
    border-radius: 5px;
}

.one-post a {
    display: flex;
    flex-direction: row;
    text-decoration: none;
}

.post-info {
    padding: 15px;
}

.post-photo {
    display:flex;
    align-self: center;
    justify-content: center;
    margin: 0px 20px;
}

.addPost {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

.addPost p {
    display: flex;
    width:fit-content;
    font-size: 3em;
}

#travelBlurb {
    font-size: 1.3em;
}

@media screen and (max-width: 800px) {
    .addPost {
        flex-direction: column;
    }

    .one-post a{
        flex-direction: column;
    }
}
</style>