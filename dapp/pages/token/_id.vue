<template>
    <div class="columns is-centered">
        <div>
            <div v-if="!loading">
                <div>Token ID: {{tokenId}}</div>
                <div>
                    &nbsp;
                </div>
                <div>
                    Name: {{metadata.name}}
                </div>
                <div>
                    <img style="max-width: 300px;" :src="metadata.image"/>
                </div>
                <div>
                    Thread:
                </div>
                <div v-for="(tweet,idx) in JSON.parse(metadata.description)" :key="idx">
                    {{idx+1}}: {{tweet.text}}
                </div>
            </div>
            <div v-else>
                      <div class="column is-four-fifths has-background-primary is-size-1">
                          Loading data from filecoin...
                      </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
  export default {
    computed: {
      ...mapGetters('web3ethers', ['nftContract'])
    },
    async asyncData({params}) {
      return {tokenId: params.id};
    },
    data() {
      return {
        loading: true,
        tokenId: null,
        metadata: null,
      }
    },
    methods: {
      async fetchTokenInfo() {
        console.log('Loading filecoin CID from nft contract...');
        const filecoinCid = await this.nftContract.tokenURI(this.tokenId);

        console.log('Loading ERC721 metadata from filecoin...');
        this.metadata = await this.$powergateService.getJsonData(filecoinCid);

        this.loading = false;
      }
    },
    watch: {
      nftContract: function(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.fetchTokenInfo();
        }
      }
    }
  }
</script>

<style scoped>

</style>