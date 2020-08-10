<template>
  <span>{{ this.priceInEth | toDp }} <span class="is-size-7">ETH</span></span>
</template>

<script>
  export default {
    props: ['priceInEth'],
  };
</script>

<style scoped lang="scss">

</style>
