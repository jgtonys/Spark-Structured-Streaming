<template>
  <div>
    <div class="row mb-3">
      <div class="col-md-6 col-xl-3" >
        <stats-card>
          <div class="icon-big" slot="header">
            <v-btn flat fab block :color="this.sparkServer.type" v-on:click="toogleServer()" :loading="this.sparkServer.loading" :disabled="this.sparkServer.loading">
              <v-icon size="50px">pause</v-icon>
            </v-btn>
          </div>
          <div class="numbers" slot="content">
            <p>{{this.sparkServer.title}}</p>
            {{this.sparkServer.value}}
          </div>
          <div class="stats" slot="footer">
            <i :class="this.sparkServer.footerIcon"></i> {{this.sparkServer.footerText}}
          </div>
        </stats-card>
      </div>
      <div class="col-md-9 col-12">
          <textarea readonly class="form-control txtarea" id="serverlog" rows="6">{{this.sparkServer.logData}}</textarea>
      </div>
    </div>



    <div class="row mb-3">
      <div class="col-md-6 col-xl-3">
        <stats-card>
          <div class="icon-big" slot="header">
            <v-btn flat fab block :color="this.sparkSlave.type" v-on:click="toogleSlave()" :loading="this.sparkSlave.loading" :disabled="this.sparkSlave.loading">
              <v-icon size="50px">pause</v-icon>
            </v-btn>
          </div>
          <div class="numbers" slot="content">
            <p>{{this.sparkSlave.title}}</p>
            {{this.sparkSlave.value}}
          </div>
          <div class="stats" slot="footer">
            <i :class="this.sparkSlave.footerIcon"></i> {{this.sparkSlave.footerText}}
          </div>
        </stats-card>
      </div>
      <div class="col-md-9 col-12">
          <textarea readonly class="form-control txtarea" id="slavelog" rows="6">{{this.sparkSlave.logData}}</textarea>
      </div>
    </div>

    <div class="row mb-3">
      <div class="col-md-4">
        <v-card v-if="folderChange">
          <v-card-title class="headline">Spark Base Folder</v-card-title>
          <v-card-text>
            <v-text-field v-model="sparkBaseFolder" label="Spark Base Folder" required>{{this.sparkBase}}</v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" flat="flat" @click="folderChange = false">
              취소
            </v-btn>

            <v-btn color="green darken-1" flat="flat" @click="folderChangeStore">
              저장
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-card v-else="folderChange">
          <v-card-title class="headline">Spark Base Folder</v-card-title>
          <v-card-text>
            <p>{{this.sparkBase}}</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" flat="flat" @click="folderChange = true">
              수정
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </div>

    <!--Charts-->
    <div class="row">
      <div class="col-12" >
        <input-chart />
      </div>
    </div>

  </div>
</template>
<script>
import { StatsCard, InputChart } from "@/components/index";
import { mapGetters } from 'vuex';
import { mapMutations } from 'vuex';
import Chartist from 'chartist';

export default {
  components: {
    StatsCard,
    InputChart
  },
  data() {
    return {
      applicationView: false,
      folderChange: false,
      sparkBaseFolder: ""
    };
  },
  methods: {
    toogleServer: function() {
      this.$store.dispatch('toggleSparkServer');
    },
    toogleSlave: function() {
      this.$store.dispatch('toggleSparkSlave');
    },
    folderChangeStore: function() {
      this.$store.commit('updateSparkBase', {
        value: this.sparkBaseFolder
      });
      this.folderChange = false;
    }
  },
  computed: mapGetters({
    sparkServer : 'getSparkServerValue',
    sparkSlave : 'getSparkSlaveValue',
    sparkBase : 'getSparkBase'
  })
};
</script>
<style>


</style>
