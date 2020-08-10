<template>
    <div>
        <div class="has-background-white">
            <b-navbar fixed-top transparent spaced>
                <template slot="brand">
                    <b-navbar-item tag="router-link" :to="{ path: '/' }">
                        <span class="has-text-black is-size-4">NFT Snapshot</span>
                    </b-navbar-item>
                </template>
                <template slot="start">
                </template>

                <template slot="end">
                    <n-link :to="{ name: 'gallery' }" class="navbar-item">
                        Gallery
                    </n-link>
                </template>
            </b-navbar>
            <section style="padding-top: 1rem; padding-bottom: 2rem; min-height: 500px;">
                <nuxt/>
            </section>
        </div>
        <footer style="padding-top: 50px; padding-bottom: 250px;">
            <div class="columns">
                <div class="column">
                    <div>
                        <p class="is-family-secondary has-text-grey-light has-text-centered">
                            ROLL IT. SNAP IT.
                        </p>
                    </div>
                </div>
                <div class="column">
                    <div>
                        <p class="is-family-secondary has-text-grey-light">
                            Filecoin Network Info
                        </p>
                        <div class="subtitle is-6">
                            Status {{status}} <br/>
                            Account: {{shortAccount}} <br/>
                            Balance: {{balance}} <br/>
                        </div>
                    </div>
                </div>
                <div class="column">
                    <div>
                        <p>
                            <n-link :to="{ name: 'gallery' }">
                                Gallery
                            </n-link>
                        </p>
                    </div>
                </div>
                <div class="column">
                    <div>
                        <p><a href="#" target="_blank">Privacy</a></p>
                        <p><a href="#" target="_blank">Terms of Service</a></p>
                    </div>
                </div>
                <div class="column">
                    <div class="level is-mobile">
                        <div class="level-left">
                            <a class="level-item" href="https://twitter.com/ethrollup" target="_blank">
                                <b-icon icon="twitter"></b-icon>
                            </a>
                        </div>
                    </div>
                    <div>
                        <p class="heading has-text-grey-light is-family-monospace">
                            Built by <a href="https://blockrocket.tech" target="_blank">BlockRocket</a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';

  export default {
    computed: {
      ...mapGetters('powergate', ['info']),
      status() {
        return this.info ? this.info.status : 'Loading...';
      },
      shortAccount() {
        return this.info ? this.dotDotDot(this.info.balancesList[0].addr.addr) : 'Loading...';
      },
      balance() {
        return this.info ? this.info.balancesList[0].balance : 'Loading...';
      }
    },
    head() {
      return {
        bodyAttrs: {
          class: 'has-navbar-fixed-top'
        },
      };
    },
    data() {
      return {

      };
    },
    methods: {
      dotDotDot(value) {
        if (!value) return '';
        if (value) {
          return value.substr(0, 6) + '...' + value.substr(value.length - 6, value.length);
        }
        return '';
      }
    },
  };
</script>

<style lang="sass">

</style>
