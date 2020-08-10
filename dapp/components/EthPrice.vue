<template>
  <span>{{ this.priceInWei | toEth }} <span class="is-size-7">ETH</span></span>
</template>

<script>
  export default {
    props: ['priceInWei'],
  };
</script>

<style scoped lang="scss">

</style>
