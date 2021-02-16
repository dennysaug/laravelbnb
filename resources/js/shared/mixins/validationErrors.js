export default {
    data() {
        return {
            errors: null
        };
    },
    methods: {
        errorFor(field) {
            return null != this.hasErrors && this.errors[field]
                ? this.errors[field]
                : null;
        }
    }
}