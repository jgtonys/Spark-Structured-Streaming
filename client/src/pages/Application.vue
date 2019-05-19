<template>
<div>
  <!--Stats cards-->

  <div class="row mb-3">
    <div class="col-md-4 col-4">
      <stats-card>
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
    <div class="col-md-8 col-8">
      <v-card class="p-3" flat>
          <v-card-actions>
            <v-select
              v-model="selectedInputFile"
              :items="inputFiles"
              item-text="text"
              item-value="value"
              label="입력 파일을 선택하세요"
            ></v-select>
            <v-btn color="green darken-1" flat="flat" @click="addFileDialog = true">
              추가
            </v-btn>
          </v-card-actions>
      </v-card>

    </div>
  </div>

  <div class="row mb-3">
    <div class="col-md-12 col-12">
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
                <th scope="row">Input File</th>
                <td>{{this.selectedInputFile}}</td>
                <td>
                  <v-btn flat :disabled="sparkAppStatus" icon color="green" @click="change([selectedInputFile,'Input File',3])">
                    <v-icon>edit</v-icon>
                  </v-btn>
                </td>
              </tr>
              <tr>
                <th scope="row">Class</th>
                <td>{{this.appOptions.class}}</td>
                <td>
                  <v-btn flat :disabled="sparkAppStatus" icon color="green" @click="change([appOptions.class,'Class',4])">
                    <v-icon>edit</v-icon>
                  </v-btn>
                </td>
              </tr>
              <tr>
                <th scope="row">Jar File</th>
                <td>{{this.appOptions.targetJar}}</td>
                <td>
                  <v-btn flat :disabled="sparkAppStatus" icon color="green" @click="change([appOptions.targetJar,'Jar File',5])">
                    <v-icon>edit</v-icon>
                  </v-btn>
                </td>
              </tr>
              <tr>
                <th scope="row">Host</th>
                <td>{{this.appOptions.host}}</td>
                <td>
                  <v-btn flat :disabled="sparkAppStatus" icon color="green" @click="change([appOptions.host,'Host',6])">
                    <v-icon>edit</v-icon>
                  </v-btn>
                </td>
              </tr>
              <tr>
                <th scope="row">Port</th>
                <td>{{this.appOptions.port}}</td>
                <td>
                  <v-btn flat :disabled="sparkAppStatus" icon color="green" @click="change([appOptions.port,'Port',7])">
                    <v-icon>edit</v-icon>
                  </v-btn>
                </td>
              </tr>
              <tr>
                <th scope="row">Window Size</th>
                <td>{{this.appOptions.windowTime}}</td>
                <td>
                  <v-btn flat :disabled="sparkAppStatus" icon color="green" @click="change([appOptions.windowTime,'Window Size',8])">
                    <v-icon>edit</v-icon>
                  </v-btn>
                </td>
              </tr>
              <tr>
                <th scope="row">Slice Size</th>
                <td>{{this.appOptions.sliceTime}}</td>
                <td>
                  <v-btn flat :disabled="sparkAppStatus" icon color="green" @click="change([appOptions.sliceTime,'Slice Size',9])">
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

  <div class="row mb-3">
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

  <v-dialog v-model="addFileDialog" persistent max-width="600px">
    <v-card class="p-5">
      <v-card-text>
        <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions" @vdropzone-complete="afterUpload"></vue-dropzone>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" flat="flat" @click="addFileDialog = false">
          닫기
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</div>
</template>
<script>
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
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
    InputChart,
    vueDropzone: vue2Dropzone
  },
  mounted() {
    var el = document.getElementById("applog");
    el.scrollTop = el.scrollHeight;
    this.showList();
  },
  data() {
    return {
      isConnected: false,
      socketMessage: '',
      dialog: false,
      dialogTarget: 0,
      dialogTargetValue: "",
      addFileDialog: false,
      changedValue: "",
      selectedInputFile: "",
      dropzoneOptions: {
        url: '/uploadInputFile',
        thumbnailWidth: 50, // px
        maxFilesize: 50,
        headers: {
          "fileDataUpload": "custom_input_file"
        },
        addRemoveLinks: true,
        dictDefaultMessage: "<i class='fa fa-cloud-upload'></i>업로드할 파일을 선택하세요"
      }
    };
  },
  methods: {
    toogleApp: function() {
      let options = this.appOptions;
      let cwd = this.sparkBase;
      var input = this.selectedInputFIle;
      console.log(input);
      //this.$socket.emit('application', options, input, cwd); // input 추가해야함
      //this.$store.dispatch('toggleSparkApp');
    },
    runPython: function() {
      this.$http.post('/runPython')
        .then(response => {
          console.log(response);
        });
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
    },
    afterUpload: function(file) {
      this.showList();
    },
    showList: function() {
      this.$http.get('/showList')
        .then(response => {
          this.$store.commit('setInputFiles', {
            value: response.data
          });
        });
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
    sparkBase: 'getSparkBase',
    inputFiles: 'getInputFiles'
  })
};
</script>
<style>
</style>
