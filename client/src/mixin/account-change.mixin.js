export default {
  data() {
    return {
      unwatch: null
    };
  },
  created() {},
  beforeMount() {},
  destroyed() {
    if(this.unwatch) {
      this.unwatch();
    }
  },
  mounted() {},
  methods: {
    async listenForAccountChange(fun) {
      this.fun = fun;
      this.unwatch = this.$store.watch((state) => state.user.token, async (val) => {
        try {
          console.log('x');
          await fun();
        } catch(e) {
          this.EventBus.$emit('err-boundary', e);
        } 
      });
    },
    destroyEvent(fun) {}
  },
  computed: {}
};
