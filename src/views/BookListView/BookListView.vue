<template>
  <div>
    <div style="padding: 8px 4px;">
      <button style="margin-right: 12px" @click="getData('1d')">按日</button>
      <button style="margin-right: 12px" @click="getData('12h')">按半日</button>
      <button style="margin-right: 12px" @click="getData('6h')">按6小时</button>
      <button style="margin-right: 12px" @click="getData('3h')">按3小时</button>
      <button style="margin-right: 12px" @click="getData('1h')">按小时</button>
      <button style="margin-right: 12px" @click="getData('30m')">按30min</button>
      <button style="margin-right: 12px" @click="getData('10m')">按10min</button>
    </div>
    <div style="padding: 8px 4px;">
      <button style="margin-right: 12px;" @click="mode='view'">点击</button>
      <button style="margin-right: 12px;" @click="mode='view-week'">周点击</button>
      <button style="margin-right: 12px;" @click="mode='view-incr'">点击增长</button>
      <button style="margin-right: 12px;" @click="mode='fav'">收藏</button>
      <button style="margin-right: 12px;" @click="mode='fav-week'">周收藏</button>
      <button style="margin-right: 12px;" @click="mode='fav-incr'">收藏增长</button>
      <button @click="mode='both'">全部</button>
    </div>
    <div>
      <button @click="checked.splice(0,10000,...bookNames)">全选</button>
      <button @click="checked.splice(0,10000)">清空</button>
      <template v-for="item of bookNames">
        <label :key="item">
          <input type="checkbox" v-model="checked" :value="item" :key="item">
          <span>{{item}}</span>
        </label>
      </template>
    </div>
    <v-chart style="height: 800px;width: 100vw" :options="chart"/>
  </div>
</template>

<script>//
import {getRecordByBookList} from "@/services/http";
import _                     from 'lodash';

export default {
  name    : "BookListView",
  data() {
    return {
      records  : [],
      bookNames: [],
      checked  : [],
      mode     : 'view',
      skip     : null,
    };
  },
  computed: {
    bookListIds() {
      return this.$route.params.ids.split(',').map(x => ~~x);
    },
    chart() {
      let series = this.records.map(([name, list]) => {
        if (this.skip) {
          list = list.filter((v, i) => !(i % this.skip));
        }
        let fav = {
          type: 'line',
          name: `${name}-收藏`,
          data: list.map(({batch_time, total_favor}) => [(new Date(batch_time)), total_favor]),
        };
        let favWeek = {
          type: 'line',
          name: `${name}-周收藏`,
          data: list.map(({batch_time, week_favor}) => [(new Date(batch_time)), week_favor]),
        };
        let view = {
          type: 'line',
          name: `${name}-点击`,
          data: list.map(({batch_time, total_click}) => [(new Date(batch_time)), total_click]),
        };
        let viewWeek = {
          type: 'line',
          name: `${name}-周点击`,
          data: list.map(({batch_time, week_click}) => [(new Date(batch_time)), week_click]),
        };
        let favIncr = {
          type: 'line',
          name: `${name}-收藏增长`,
          // stack: '收藏增长',
          // areaStyle: {},
          data: list.slice(1)
            .map(({batch_time, total_favor}, index) => [(new Date(batch_time)), total_favor - list[index].total_favor]),
        };
        let viewIncr = {
          type : 'line',
          name : `${name}-点击增长`,
          // stack: '点击增长',
          // areaStyle: {},
          data : list.slice(1)
            .map(({batch_time, total_click}, index) =>
              [(new Date(batch_time)), total_click - list[index].total_click]),
        };
        if (!this.checked.includes(name)) return [];
        if (this.mode === 'view') return view;
        if (this.mode === 'view-week') return viewWeek;
        if (this.mode === 'fav') return fav;
        if (this.mode === 'fav-week') return favWeek;
        if (this.mode === 'view-incr') return viewIncr;
        if (this.mode === 'fav-incr') return favIncr;
        else return [fav, view, viewIncr, favIncr];
        // return [fav, view];
      }).flat();
      return {
        xAxis   : {type: 'time'},
        yAxis   : {type: 'value', min: 'dataMin'},
        legend  : {},
        dataZoom: [
          {
            type      : 'slider',
            xAxisIndex: 0,
            filterMode: 'empty',
          },
        ],
        tooltip : {
          trigger    : 'axis',
          axisPointer: {
            type     : 'cross',
            animation: false,
            label    : {
              backgroundColor: '#505765',
            },
          },
        },
        series,
      };
    },
  },
  async created() {
    this.getData();
  },
  methods : {
    async getData(type = '30m') {
      let all = await Promise.all(this.bookListIds.map(id => getRecordByBookList(id, type)));
      all = all.map(x => x.data).flat();
      let grouped = _.groupBy(all, x => x.book_name);
      all = Object.entries(grouped);
      this.records = all;
      this.checked = this.checked.length > 0 ? this.checked : Object.keys(grouped);
      this.bookNames = Object.keys(grouped);
    },
  },
};
</script>

<style scoped>

</style>