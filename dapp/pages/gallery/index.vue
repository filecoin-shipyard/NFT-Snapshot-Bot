<template>
    <div>
        <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
        <div class="tile is-ancestor">
            <div class="tile is-vertical is-2">
                <div class="tile is-parent is-vertical">
                    <article class="tile is-child notification is-white">
                        <p class="title">Trending</p>

                        <p class="title">Tags</p>
                        <p>#recent</p>
                        <p class="has-margin-top-7">#featured</p>
                        <p class="has-margin-top-7">#cryptoart</p>
                        <p class="has-margin-top-7">#covid19</p>
                    </article>
                </div>
            </div>
            <div class="tile is-parent">
                <div class="tile is-child notification is-white">
                    <div class="columns">
                        <div class="column" v-for="(tweet,idx) in validThreads" :key="idx">
                            <n-link :to="`/gallery/${tweet.originalTweetId}`">
                                <div class="card">
                                <div class="card-image">
                                    <figure class="image is-4by3">
                                        <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
                                    </figure>
                                </div>
                                <div class="card-content">
                                    <div class="media">
                                        <div class="media-left">
                                            <figure class="image is-48x48">
                                                <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
                                            </figure>
                                        </div>
                                        <div class="media-content">
                                            <p class="title is-4">{{tweet.originalTweetId}}</p>
                                            <p class="subtitle is-6">@{{tweet.originalTaggerId}}</p>
                                        </div>
                                    </div>

                                    <div class="content">
                                        {{tweet.threadName}}
                                        <br>
                                        <time datetime="2016-1-1">{{tweet.timestamp | moment("from")}}</time>
                                    </div>
                                </div>
                            </div>
                            </n-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
      data() {
        return {
          tweets: []
        }
      },
      computed: {
        validThreads() {
          return this.tweets.filter(tweet => tweet.threadName && tweet.threadName.length > 0);
        }
      },
      async asyncData({app}) {
        const snapshot = await app.$fireStore.collection('tweets').get();
        return {tweets: snapshot.docs.map(doc => doc.data())};
      },
    };
</script>

<style></style>
