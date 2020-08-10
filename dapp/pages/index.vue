<template>
    <div>
        <header-banner></header-banner>

        <div class="tile is-ancestor">
            <div class="tile is-parent is-vertical">
                <div class="tile is-child notification is-white">
                    <div class="has-text-centered">
                        <n-link :to="{ name: 'gallery' }" class="button is-primary is-outlined">
                            View gallery
                        </n-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import HeaderBanner from '@/components/HeaderBanner';

    export default {
        components: {HeaderBanner},
        data: () => ({
        }),
    };
</script>

<style></style>
