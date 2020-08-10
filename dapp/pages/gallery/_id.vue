<template>
  <div class="columns is-centered">
    <div v-if="tweetByStatusId">
      <div v-if="threadData && threadData.thread">
        <div class="column is-four-fifths is-size-3">
            {{threadData.threadName}}
        </div>
        <br/>
        <div v-for="(tweet,idx) in threadData.thread.reverse()" :key="idx">
          {{idx+1}}/{{threadData.thread.length}}: {{tweet.text}}
        </div>

        <br/>
        <h2>IPFS Hash:</h2>
        {{threadData.ipfsHash}}

        <br/>
        <b-button @click="buy">Buy Thread</b-button>
        <br/>
        <p>Status updates:</p>
        <div v-for="(log, idx) in logs.reverse()" :key="log.msg">
          {{ log.msg }}
        </div>
      </div>
    </div>
    <div v-else class="column">
      No tweet for {{ $route.params.id }}
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    computed: {
      ...mapGetters('web3ethers', [
         'nftContract',
         'account'
      ]),
    },
    data() {
      return {
        tweetByStatusId: null,
        threadData: null,
        logs: []
      };
    },
    async asyncData({app, params}) {
      // Get tweet
      const tweet = await app.$fireStore.collection('tweets').doc(params.id).get();

      return {tweetByStatusId: params.id, threadData: tweet.data()};
    },
    methods: {
      async buy() {
        console.log('buy started...')

        console.log('create storage deal...')
        const jobId = await this.$powergateService.storeIpfsDataOnFileCoin(this.threadData.ipfsHash);
        console.log('job id', jobId);

        const logCallback = (log) => {
          this.logs.push(log);

          if (log.msg === 'Cold-Storage execution ran successfully.') {
            console.log('Time to mint the rollup...');
            this.mintNft();
          }
        };

        this.$powergateService.watchLogs(logCallback, this.threadData.ipfsHash);
      },
      async mintNft() {
        await this.nftContract.mint(this.threadData.ipfsHash, this.account);
      },
    },
    // head() {
    //   return {
    //     title: `Edition #${this.editionById.id}`,
    //     meta: [
    //       {
    //         hid: `title`,
    //         name: 'title',
    //         content: `${this.editionById.metadata.name}`
    //       },
    //       {
    //         hid: `description`,
    //         name: 'description',
    //         content: `${this.editionById.metadata.description}`
    //       },
    //       {
    //         hid: `image`,
    //         name: 'image',
    //         content: this.editionById.metadata.image
    //       },
    //       {
    //         hid: `og:title`,
    //         name: 'og:title',
    //         content: `${this.editionById.metadata.name}`
    //       },
    //       {
    //         hid: `og:description`,
    //         name: 'og:description',
    //         content: `${this.editionById.metadata.description}`
    //       },
    //       {
    //         hid: `og:image`,
    //         name: 'og:image',
    //         content: this.editionById.metadata.image
    //       },
    //       {
    //         hid: `og:url`,
    //         name: 'og:url',
    //         content: this.editionById.metadata.image
    //       },
    //       {
    //         hid: `twitter:description`,
    //         property: "twitter:description",
    //         content: `${this.editionById.metadata.description}`
    //       },
    //       {
    //         hid: `twitter:title`,
    //         property: "twitter:title",
    //         content: `${this.editionById.metadata.name}`
    //       }
    //     ]
    //   };
    // },
  };
</script>

<style>
</style>
