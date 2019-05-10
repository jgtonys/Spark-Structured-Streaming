<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">{{routeName}}</a>
      <button class="navbar-toggler navbar-burger"
              type="button"
              @click="toggleSidebar"
              :aria-expanded="$sidebar.showSidebar"
              aria-label="Toggle navigation">
        <span class="navbar-toggler-bar"></span>
        <span class="navbar-toggler-bar"></span>
        <span class="navbar-toggler-bar"></span>
      </button>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a href="#" class="nav-link" v-if="socketStat">
              <div class="text-primary" >
                <i class="ti-rss-alt"></i>
                <p class="text-primary"> Socket On</p>
              </div>
            </a>
            <a href="#" class="nav-link" v-else>
              <div>
                <i class="ti-rss-alt"></i>
                <p > Socket OFF</p>
              </div>
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link" v-if="appStat">
              <div class="text-primary">
                <i class="ti-layout-media-right-alt"></i>
                <p class="text-primary">App Running</p>
              </div>
            </a>
            <a href="#" class="nav-link" v-else>
              <div>
                <i class="ti-layout-media-right-alt"></i>
                <p >App Stopped</p>
              </div>
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="ti-settings"></i>
              <p>
                Settings
              </p>
            </a>
          </li>
        </ul>
      </div>
    </div></nav>
</template>
<script>
export default {
  computed: {
    routeName() {
      const { name } = this.$route;
      return this.capitalizeFirstLetter(name);
    }
  },
  data() {
    return {
      activeNotifications: false
    };
  },
  sockets: {
    connect() {
      this.$store.dispatch('connectSocket');
    },
    disconnect() {
      this.$store.dispatch('connectSocket');
    },
    application(data) {
      this.$store.commit('updateAppLog', {
        value: data
      });
      /*this.$store.commit('updateNewDataSet', {
        value: data
      });*/
    }
  },
  methods: {
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    toggleNotificationDropDown() {
      this.activeNotifications = !this.activeNotifications;
    },
    closeDropDown() {
      this.activeNotifications = false;
    },
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    hideSidebar() {
      this.$sidebar.displaySidebar(false);
    }
  },
  computed: {
    socketStat() {
      return this.$store.getters.getSocketConnected;
    },
    appStat() {
      return this.$store.getters.getSparkApp;
    }
  }
};
</script>
<style>
</style>
