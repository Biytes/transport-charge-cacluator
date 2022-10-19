<script>
import { mapState, mapActions } from 'vuex'
export default {
    onLaunch() {
        console.log('App Launch');
    },
    onShow() {
        console.log('App Show')
    },
    onHide() {
        console.log('App Hide')
    },

    computed: {
        ...mapState('common', ['locale'])
    },

    methods: {
    }
}
</script>

<style lang="scss">
@import '@/static/styles/reset.css';
@import '@/static/styles/base.scss';
@import '@/static/styles/global.scss';
@import "uview-ui/index.scss";
/*每个页面公共css */
page {
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
}

* {
    box-sizing: border-box;
}
</style>
