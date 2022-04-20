<template>
    <router-view />
</template>

<script>
import { mapState } from "vuex";

export default {
    computed: {
        ...mapState(["user"]),
    },
};
</script>
