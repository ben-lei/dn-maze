<template>
  <div class="row build-input">
    <div :class="cols[0]">
      <div class="input-group">
        <input type="text" class="form-control" :value="buildUrl" id="build-url" @click="this.select()" />
        <span class="input-group-btn" v-if="!isMobile()">
          <button class="btn btn-secondary" type="button" title="Copy" data-clipboard-target="#foo">
            <i class="fa fa-files-o"/>
          </button>
        </span>
        <span class="input-group-btn">
          <button class="btn btn-secondary" type="button" @click="reset" title="Reset">
            <i class="fa fa-refresh"/>
          </button>
        </span>
      </div>
    </div>
    <Alert :class="cols[1]"/>
    <!--<Help/>-->
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import Alert from './Alert';

  export default {
    props: ['cols'],
    data() {
      let location = window.location.href;
      location = location.substring(0, location.indexOf('#'));

      return {
        location,
      };
    },

    watch: {
      path(newPath) {
        const slug = this.$route.params.slug;
        const prefix = this.isMobile() ? 'mobile' : 'desktop';
        const name = newPath.length ? `${prefix}-build` : prefix;

        this.$router.replace({
          name,
          params: {
            slug,
            path: newPath,
          },
        });
      },
    },

    computed: {
      ...mapGetters([
        'path',
      ]),

      buildUrl() {
        const path = this.path;
        const slug = this.$route.params.slug;
        const prefix = this.isMobile() ? '/m' : '';

        if (path.length) {
          return `${this.location}#${prefix}/${slug}/${this.path}`;
        }

        return `${this.location}#${prefix}/${slug}`;
      },
    },

    methods: {
      ...mapActions([
        'reset',
      ]),
    },

    components: {
      Alert,
    },
  };
</script>

<style>
  .build-input {
    margin-bottom: 1rem;
  }
</style>