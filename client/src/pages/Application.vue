<template>
<div>
  <!--Stats cards-->

  <div class="row mb-3">
    <div class="col-md-6 col-xl-3">
      <stats-card v-bind:class="{ gradient: sparkAppStatus }">
        <div class="icon-big" slot="header">
          <v-btn flat fab block :color="this.sparkApp.type" v-on:click="toogleApp()" :loading="this.sparkApp.loading" :disabled="this.sparkApp.loading">
            <v-icon size="50px">{{this.sparkApp.icon}}</v-icon>
          </v-btn>
        </div>
        <div class="numbers" slot="content">
          <p>{{this.sparkApp.title}}</p>
          {{this.sparkApp.value}}
        </div>

        <div class="stats" slot="footer">
          <i :class="this.sparkApp.footerIcon"></i> {{this.sparkApp.footerText}}
        </div>
      </stats-card>
    </div>
    <div class="col-md-9 col-12">
      <card>
        <h3 class="pl-4 pb-2 mb-2" v-if="sparkAppStatus">Application Options</h3>
        <h3 class="pl-4 pb-2 mb-2" v-else="sparkAppStatus">Application Options (Editable)</h3>
        <div style="height: 300px; overflow: scroll;" class="m-3">
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">Option</th>
                <th scope="col">Value</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Base Method</th>
                <td>{{this.appOptions.baseMethod}}</td>
                <td>
                  <v-btn flat :disabled="sparkAppStatus" icon color="green" @click="change([appOptions.baseMethod,'Base Method',0])">
                    <v-icon>edit</v-icon>
                  </v-btn>
                </td>
              </tr>
              <tr>
                <th scope="row">Packages</th>
                <td>{{this.appOptions.packages}}</td>
                <td>
                  <v-btn flat :disabled="sparkAppStatus" icon color="green" @click="change([appOptions.packages,'Packages',1])">
                    <v-icon>edit</v-icon>
                  </v-btn>
                </td>
              </tr>
              <tr>
                <th scope="row">Master</th>
                <td>{{this.appOptions.master}}</td>
                <td>
                  <v-btn flat :disabled="sparkAppStatus" icon color="green" @click="change([appOptions.master,'Master',2])">
                    <v-icon>edit</v-icon>
                  </v-btn>
                </td>
              </tr>
              <tr>
                <th scope="row">Class</th>
                <td>{{this.appOptions.class}}</td>
                <td>
                  <v-btn flat :disabled="sparkAppStatus" icon color="green" @click="change([appOptions.class,'Class',3])">
                    <v-icon>edit</v-icon>
                  </v-btn>
                </td>
              </tr>
              <tr>
                <th scope="row">Jar File</th>
                <td>{{this.appOptions.targetJar}}</td>
                <td>
                  <v-btn flat :disabled="sparkAppStatus" icon color="green" @click="change([appOptions.targetJar,'Jar File',4])">
                    <v-icon>edit</v-icon>
                  </v-btn>
                </td>
              </tr>
              <tr>
                <th scope="row">Host</th>
                <td>{{this.appOptions.host}}</td>
                <td>
                  <v-btn flat :disabled="sparkAppStatus" icon color="green" @click="change([appOptions.host,'Host',5])">
                    <v-icon>edit</v-icon>
                  </v-btn>
                </td>
              </tr>
              <tr>
                <th scope="row">Port</th>
                <td>{{this.appOptions.port}}</td>
                <td>
                  <v-btn flat :disabled="sparkAppStatus" icon color="green" @click="change([appOptions.port,'Port',6])">
                    <v-icon>edit</v-icon>
                  </v-btn>
                </td>
              </tr>
              <tr>
                <th scope="row">Window Size</th>
                <td>{{this.appOptions.windowTime}}</td>
                <td>
                  <v-btn flat :disabled="sparkAppStatus" icon color="green" @click="change([appOptions.windowTime,'Window Size',7])">
                    <v-icon>edit</v-icon>
                  </v-btn>
                </td>
              </tr>
              <tr>
                <th scope="row">Slice Size</th>
                <td>{{this.appOptions.sliceTime}}</td>
                <td>
                  <v-btn flat :disabled="sparkAppStatus" icon color="green" @click="change([appOptions.sliceTime,'Slice Size',8])">
                    <v-icon>edit</v-icon>
                  </v-btn>
                </td>
              </tr>

            </tbody>
          </table>
        </div>
      </card>
    </div>

  </div>
  <div class="row">
    <div class="col-md-12 col-12">
      <textarea readonly class="form-control txtarea" id="applog" rows="12">{{this.sparkApp.logData}}</textarea>
    </div>
  </div>



  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card>
      <v-card-title class="headline">{{this.dialogTargetLabel}} 수정</v-card-title>

      <v-card-text>
        <v-text-field v-model="changedValue" :label="this.dialogTargetLabel" required>{{this.dialogTargelValue}}</v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" flat="flat" @click="dialog = false">
          취소
        </v-btn>

        <v-btn color="green darken-1" flat="flat" @click="changeStore">
          저장
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</div>
</template>
<script>
import {
  StatsCard,
  InputChart
} from "@/components/index";
import {
  mapGetters
} from 'vuex';
import {
  mapMutations
} from 'vuex';
import Chartist from 'chartist';

export default {
  components: {
    StatsCard,
    InputChart
  },
  mounted() {
    var el = document.getElementById("applog");
    el.scrollTop = el.scrollHeight;
  },
  data() {
    return {
      isConnected: false,
      socketMessage: '',
      dialog: false,
      dialogTarget: 0,
      dialogTargetValue: "",
      changedValue: ""
    };
  },
  methods: {
    toogleApp: function() {
      let options = this.appOptions;
      let cwd = this.sparkBase;
      this.$socket.emit('test', options, cwd);
      this.$store.dispatch('toggleSparkApp');
    },
    change: function(value) {
      this.dialogTargetValue = value[0];
      this.dialogTargetLabel = value[1];
      this.dialogTarget = value[2];
      this.changedValue = this.dialogTargetValue;
      this.dialog = true;
    },
    changeStore: function() {
      this.$store.commit('updateAppOption', {
        key: this.dialogTarget,
        value: this.changedValue
      });
      this.dialog = false;
    }
  },
  updated: function() {
    var el = document.getElementById("applog");
    el.scrollTop = el.scrollHeight;
  },
  computed: mapGetters({
    sparkApp: 'getSparkAppValue',
    sparkAppStatus: 'getSparkApp',
    appOptions: 'getAppOptions',
    sparkBase: 'getSparkBase'
  })
};
</script>
<style>
.gradient {
  background: linear-gradient(45deg, black, white);
  background-size: 100% 100%;
  -webkit-animation: AnimationName 10s ease infinite;
  -moz-animation: AnimationName 10s ease infinite;
  animation: AnimationName 10s ease infinite;
}

@-webkit-keyframes AnimationName {
  0% {
    background-position: 0% 50%
  }
  50% {
    background-position: 100% 50%
  }
  100% {
    background-position: 0% 50%
  }
}

@-moz-keyframes AnimationName {
  0% {
    background-position: 0% 50%
  }
  50% {
    background-position: 100% 50%
  }
  100% {
    background-position: 0% 50%
  }
}

@keyframes AnimationName {
  0% {
    background-position: 0% 50%
  }
  50% {
    background-position: 100% 50%
  }
  100% {
    background-position: 0% 50%
  }
}
</style>
