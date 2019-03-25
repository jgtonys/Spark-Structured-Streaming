<template>
<div>
  <!--Stats cards-->

  <div class="row mb-3">
    <div class="col-md-6 col-xl-3">
      <card>
        <h2>{{this.sparkApp.title}}</h2>
        <div class="row">
          <div class="col-4">
        <v-btn flat icon :color="this.sparkApp.type" @click="toogleApp()">
          <v-icon x-large>{{this.sparkApp.icon}}</v-icon>
        </v-btn>
      </div>
      <div class="col-8">
        <h3>{{this.sparkApp.value}}</h3>
      </div>
    </div>
        <div>


        </div>
        <div>
          <i :class="this.sparkApp.footerIcon"></i> {{this.sparkApp.footerText}}
        </div>
      </card>
    </div>
    <div class="col-md-9 col-12">
      <card>
        <h3 class="mb-2" v-if="sparkAppStatus">Application Options</h3>
        <h3 class="mb-2" v-else="sparkAppStatus">Application Options (Editable)</h3>
        <div style="height: 300px; overflow: scroll;">
        <table class="table table-hover" >
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
      <textarea readonly class="form-control txtarea" id="applog" rows="6">{{this.sparkApp.logData}}</textarea>
    </div>
  </div>

  <div class="row">
    <div class="col-md-12 col-12">
      <json-viewer
        :value="sparkApp.logData"
        :expand-depth=5
        copyable
        boxed
        sort>
      </json-viewer>
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
  data() {
    return {
      isConnected: false,
      socketMessage: '',
      dialog: false,
      dialogTarget: 0,
      dialogTargetValue: "",
      changedValue: "",
    };
  },
  sockets: {
    connect() {
      this.$store.dispatch('connectSocket');
    },
    disconnect() {
      this.$store.dispatch('connectSocket');
    },
    test(data) {
      this.$store.commit('updateAppLog', {
        value: data
      });
    }
  },
  methods: {
    toogleApp: function() {
      let options = this.appOptions;
      let cwd = this.sparkBase;
      this.$socket.emit('test',options,cwd);
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
</style>
