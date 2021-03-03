<template>
    <button class="btn btn-secondary btn-block" @click="check" :disabled="loading">
        <span v-if="!loading">
            <slot></slot>
        </span>
        <span v-if="loading">
            <i class="fas fa-circle-notch fa-spin"></i> Checking...
        </span>
    </button>
</template>

<script>
import {is422} from "../utils/response";
import validationErrors from "../mixins/validationErrors";

export default {
    mixins: [validationErrors],
    props: {
        bookableId: [String, Number]
    },

    methods: {
        check() {
            this.loading = true;
            this.errors = null;

            this.$store.dispatch('setLastSearch', {
                from: this.from,
                to: this.to
            });


            axios.get(`/api/bookables/${this.bookableId}/availability?from=${this.from}&to=${this.to}`)
                .then(response => {
                    this.status = response.status;
                }).catch(error => {
                if (is422(error)) {
                    this.errors = error.response.data.errors;
                }

                this.status = error.response.status

            }).then(
                () => (this.loading = false)
            );
        }
    }

}
</script>

<style scoped>

</style>
