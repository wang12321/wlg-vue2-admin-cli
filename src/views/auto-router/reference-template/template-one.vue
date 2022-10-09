<template>
  <div>
    <el-container>
      <el-header style="height: auto">
        <search-form
          :form-options="formOptions"
          :form-data="formData"
          @submit="submit"
        />
      </el-header>
      <el-main>
        <TableComponent
          :table-data="tableData"
          :table-column="tableColumn"
          :options="options"
          :summary-method="getSummaries"
          :show-summary="true"
        />
        <Pagination :key="pageKey" :page-data="pageData" @reloadData="reloadData" />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { renderTip } from '@/utils'
import { Message } from 'element-ui'

export default {
  name: 'TemplateOne',
  meta: {
    title: '模板1',
    icon: 'form',
    permissionArray: [1, 2, 3],
    sortIndex: 2,
    newTime: '2022-05-20'
  },
  data() {
    return {
      roundCount: 0, // 合计
      pageKey: 0, // 刷新分页组件key
      total: 0,
      dateData: [],
      isAdvanced: true,
      formData: {
        unionType: 'all',
        object_id: '',
        datePicker: []
      },
      tableData: [{
        'union_id': 53686,
        'union_name': '名称',
        'club_id': 150625,
        'club_name': '名称',
        'user_id': 35625279,
        'user_name': '名称',
        'round_count': 8563,
        'is_open': true
      },
      {
        'union_id': 65886,
        'union_name': '65886',
        'club_id': 555520,
        'club_name': '555520',
        'user_id': 35392059,
        'user_name': '名称',
        'round_count': 8205,
        'is_open': true
      },
      {
        'union_id': 50955,
        'union_name': '685',
        'club_id': 459431,
        'club_name': '459431',
        'user_id': 38459088,
        'user_name': '名称',
        'round_count': 6948,
        'is_open': true
      }],
      tableColumn: [
        {
          label: '昵称（ID）',
          prop: 'club_name',
          align: 'left',
          formatter: (row) => {
            return `<span>${row.union_name}</span><span> ${row.union_id !== 0 ? '(' + row.union_id + ')' : '/'}</span>`
          }
        }, {
          label: '昵称2(ID)',
          prop: 'union_name',
          align: 'left',
          formatter: (row) => {
            return `<span>${row.club_name}</span><span> ${row.club_id !== 0 ? '(' + row.club_id + ')' : '/'}</span>`
          }
        }, {
          label: '昵称3（ID）',
          prop: 'user_name',
          align: 'left',

          formatter: (row) => {
            return `<span>${row.user_name}</span><span> ${row.user_id !== 0 ? '(' + row.user_id + ')' : '/'}</span>`
          }
        }, {
          label: '圈数',
          prop: 'round_count',
          align: 'left',

          showTip: (h, { column }) => {
            return renderTip(h, { column }, '展示累计大局数')
          },
          formatter: (row) => {
            return `<span style="color: dodgerblue;">${row.round_count}</span>`
          }
        },
        {
          label: '开放',
          prop: 'lrsj',
          align: 'left',
          showTip: (h, { column }) => {
            return renderTip(h, { column }, '右滑打开按钮，开启')
          },
          render: (h, params) => {
            return h('el-switch', { props: { 'active-color': '#13ce66', 'inactive-color': '#ff4949' },
              attrs: {
                value: params.row.is_open // 处理默认显示的,
              },
              on: {
                input: function(event) {
                  params.row.is_open = event
                },
                change: (e) => {
                  this.switchActon(params.row)
                }
              }
            })
          }
        }
      ],
      options: {
        loading: false,
        border: true,
        className: 'table-class'
      },
      allGameIdInfo: []
    }
  },
  computed: {
    ...mapGetters([
      'device'
    ]),
    pageData() {
      return { total: this.total, page: 1, rows: 20 }
    },
    formOptions() {
      return [
        { titleShow: true, title: 'ID', placeholder: 'ID', key: 'object_id', type: 'input', clearable: true },
        { titleShow: true, title: '', key: 'datePicker', type: 'datePicker', isAdvanced: true, change: this.changeDate },
        { titleShow: true, title: '', key: 'unionType', type: 'select', options: [{ value: 'all', label: '全部' }, { value: 'union', label: '选项1' }, { value: 'club', label: '选项2' }], label: 'label', value: 'value' }
      ]
    }
  },
  mounted() {
    this.formData.datePicker = this.dateData
    this.getDataList()
    // onclick="reloadData()"
    // window.reloadData = this.reloadData // 解决字符串模板@click无效的问题
  },
  methods: {
    // 数据请求
    getDataList() {
      this.total = 100
      this.roundCount = 200
    },
    // 竞技赛场开放请求
    switchActon(row) {
      Message({
        message: '设置成功',
        type: 'success',
        duration: 2 * 1000
      })
    },
    // 日期选择区间
    changeDate(mutableSearchDateRange) {
      this.dateData = mutableSearchDateRange
    },
    // 查询
    submit() {
      this.pageData.page = 1
      this.pageKey += 1
      this.getDataList()
    },
    // 分页
    reloadData() {
      this.getDataList()
    },
    // 自定义合计
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        }
        if (index === 1) {
          sums[index] = '/'
          return
        }
        if (index === 2) {
          sums[index] = '/'
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
          sums[index] = this.roundCount
        } else {
          sums[index] = '/'
        }
      })
      return sums
    }
  }
}
</script>

