<template>
  <CURDexample
    :table-column="tableColumn"
    :table-data="tableData"
    :formlist="formlist"
    :form-data="formData"
    :dialog-form-data.sync="dialogFormData"
    :is-advanced="isAdvanced"
    :page-data="pageData"
    @searchSubmit="searchSubmit"
    @sortchange="sortchange"
    @submitAdd="submitAdd"
    @submitEdit="submitEdit"
    @reloadData="reloadData"
    @deleteData="deleteData"
  />
</template>

<script>
export default {
  name: 'User',
  meta: {
    title: '用户管理',
    icon: 'form',
    permissionArray: [1, 2, 3],
    sortIndex: 1,
    newTime: '2022-05-20'
  },
  data() {
    return {
      pageData: { total: 100, page: 1, rows: 20 },
      isAdvanced: true,
      formData: {},
      dialogFormData: {},
      formlist: [
        { search: true, titleShow: true, clearable: true, title: '年份', key: 'year', type: 'year' },
        { search: true, titleShow: true, clearable: true, title: '日期', key: 'date', type: 'date' }
      ],
      tableColumn: [
        {
          label: '名称',
          prop: 'tzmc',
          align: 'left',
          add: true,
          search: true,
          rules: true,
          placeholder: '请输入名称',
          type: 'input',
          isAdvanced: true
        }, {
          label: '权限',
          prop: 'gxlx',
          align: 'left',
          add: true,
          search: true,
          type: 'select',
          options: [{ value: '1', label: '是' }, { value: '2', label: '否' }],
          optionLabel: 'label',
          optionValue: 'value',
          render: (h, params) => {
            return h('span', { style: 'color: dodgerblue' }, params.row.gxlx)
          }
        }, {
          label: '创建时间',
          prop: 'lrsj',
          formatter: (row) => {
            return `<span style="color: dodgerblue;">${row.lrsj}</span>`
          }
        }, {
          label: '更新时间',
          prop: 'xgsj'
        }
      ],
      tableData: [{
        tzmc: '游戏',
        lrsj: '2020-02-02',
        xgsj: '2020-03-03',
        gxlx: '全平台'
      },
      {
        tzmc: '游戏1',
        lrsj: '2020-02-02',
        xgsj: '2020-03-03',
        gxlx: '全平台'
      }]
    }
  },
  mounted() {
  },
  methods: {
    deleteData() {
      alert('删除')
    },
    searchSubmit(data) {
      console.log(data)
      alert('查询了')
    },
    sortchange(e) {
      console.log(e)
      alert(e.column.label + '排序')
    },
    submitAdd(data) {
      console.log(data)
      alert('新增了')
    },
    submitEdit() {
      alert('编辑了')
    },
    reloadData() {
      alert('当前页码' + this.pageData.page)
    }
  }
}
</script>

<style scoped>

</style>

