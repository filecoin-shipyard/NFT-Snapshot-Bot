<template>
  <span class="is-size-3">{{ this.priceInWei | toEth }} <span class="is-size-4">ETH</span></span>
</template>

<script>
  export default {
    props: ['priceInWei'],
  };
</script>

<style scoped lang="scss">

</style>
