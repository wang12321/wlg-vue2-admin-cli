<template>
  <div>
    <el-container>
      <el-header style="height: auto">
        <search-form
          :form-options="formOptions"
          :form-data="searchData"
          @submit="onTriggerQuery"
        >
          <template v-slot:button>
            <el-button type="primary" @click="addMenu">新增</el-button>
          </template>
        </search-form>
      </el-header>
      <el-main>
        <TableComponent
          :table-data="tableData"
          :table-column="tableColumn"
          :options="options"
          :operates="operates"
          height="calc(100vh - 220px)"
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
          row-key="id"
        />
        <Pagination :key="pageKey" :page-data="pageData" @reloadData="handlePageChange" />
      </el-main>
    </el-container>
    <el-dialog :visible.sync="isShowDialog" :title="isCreateData?'添加':'编辑'" width="50%">
      <dialog-form
        :span="12"
        :form-list="formList"
        :form-data="formData"
        :rules="rules"
        :loading="isLoading"
        @submit="onSubmit"
        @CANCEL="cancelClick"
      />
    </el-dialog>
  </div>
</template>

<script>
import { REQUIRED } from '@/utils/reg/validate'
import { menuType } from '@/utils/type-map'
import { menuModule } from '@/services/api'
const { postQueryMenuByPageApi, postInsertOrUpdateApi } = menuModule
export default {
  name: 'Index',
  meta: {
    title: '菜单管理',
    icon: 'form',
    sortIndex: 3
  },
  data() {
    return {
      isCreateData: true,
      isShowDialog: false,
      pageKey: 0, // 刷新分页组件key
      total: 0,
      giftIDList: [],
      rules: {
        menuParentId: [REQUIRED('请选择父级菜单')],
        menuName: [REQUIRED('请输入菜单名称')],
        menuCode: [REQUIRED('请输入菜单编码')],
        menuType: [REQUIRED('请选择菜单类型')],
        menuIcon: [REQUIRED('请选择菜单图标')],
        menuSort: [REQUIRED('请选择菜单排序')]
      },
      searchData: { menuName: '', menuSys: '1', menuType: 1 },
      formData: {},
      operates: {
        isButton: false,
        width: '200px',
        label: '操作',
        align: 'left',
        list: [
          {
            label: '新增',
            show: true,
            icon: 'el-icon-circle-plus-outline',
            method: (index, row) => {
              this.formData = { ...row }
              this.isCreateData = false
              this.isShowDialog = true
            }
          },
          {
            label: '编辑',
            show: true,
            icon: 'el-icon-edit',
            method: (index, row) => {
              this.formData = { ...row }
              this.isCreateData = false
              this.isShowDialog = true
            }
          },
          {
            label: '确定删除',
            show: true,
            btnType: 'danger',
            type: 'delete',
            icon: 'el-icon-delete',
            method: (index, row) => {
            }
          }
        ]
      },
      tableData: [],
      tableColumn: [
        {
          label: '菜单名称',
          showOverflowTooltip: true,
          prop: 'menuName',
          align: 'left'
        },
        {
          label: 'ID',
          showOverflowTooltip: true,
          prop: 'id',
          align: 'left',
          width: '100px'
        },
        {
          label: '菜单编码',
          showOverflowTooltip: true,
          prop: 'menuCode',
          align: 'left'
        },
        {
          label: '路径',
          showOverflowTooltip: true,
          prop: 'menuPath',
          align: 'left'
        },
        {
          label: '菜单类型',
          showOverflowTooltip: true,
          prop: 'menuTypeText',
          align: 'center',
          width: '100px'
        },
        {
          label: '菜单图标',
          showOverflowTooltip: true,
          prop: 'menuIcon',
          align: 'center',
          width: '100px',
          formatter: (row) => {
            return `<i class="${row.menuIcon}" />`
          }
        },
        {
          label: '排序',
          showOverflowTooltip: true,
          prop: 'menuSort',
          align: 'center',
          width: '100px'

        },
        {
          label: '备注',
          showOverflowTooltip: true,
          prop: 'remark',
          align: 'left'
        }
      ],
      options: {
        loading: false,
        border: true,
        isButton: false
      }
    }
  },
  computed: {
    isLoading() {
      return this.$store.state.user.isBtnLoading
    },
    pageData() {
      return { total: this.total, page: 1, rows: 20 }
    },
    formList() {
      return [
        { title: '父级菜单', placeholder: '顶级菜单', key: 'menuParentName', type: 'input', disabled: true, clearable: true },
        { title: '菜单名称', placeholder: '请输入菜单名称', clearable: true, key: 'menuName', type: 'input' },
        { title: '菜单编码', placeholder: '请输入菜单编码', clearable: true, key: 'menuCode', type: 'input' },
        { title: '路径', placeholder: '请输入路径', clearable: true, key: 'menuPath', type: 'input' },
        { title: '菜单类型', placeholder: '请选择菜单类型', clearable: true, key: 'menuType', type: 'select', options: menuType, label: 'label', value: 'value' },
        { title: '菜单图标', placeholder: '请选择菜单图标', clearable: true, key: 'menuIcon', type: 'input' },
        { title: '菜单排序', placeholder: '请输入菜单排序', clearable: true, key: 'menuSort', type: 'input' },
        { title: '菜单备注', placeholder: '请输入菜单备注', clearable: true, key: 'remark', type: 'input' }
      ]
    },
    formOptions() {
      return [
        { titleShow: true, title: '菜单名称', placeholder: '菜单名称', clearable: true, key: 'menuName', type: 'input' }
      ]
    }
  },
  mounted() {
    this.postQueryMenuByPageList()
  },
  methods: {
    postQueryMenuByPageList() {
      let data = {}
      data = Object.assign({}, { ...this.searchData }, { ...this.pageData })
      postQueryMenuByPageApi(data).then((res) => {
        if (res && res.data) {
          this.tableData = res.data.records || []
          this.total = res.data.total
        }
      })
    },
    addMenu() {
      this.formData = {
        menuParentId: '0'
      }
      this.isCreateData = true
      this.isShowDialog = true
    },
    cancelClick() {
      this.isShowDialog = false
    },
    onSubmit() {
      let data = {
        game_id: Number(this.$store.state.permission.gameId),
        reward_prop_id: Number(this.formData.reward_prop_id), // 固定就是绿叶道具id
        reward_prop_num: Number(this.formData.reward_prop_num),
        do_num: Number(this.formData.do_num),
        gift_id: Number(this.formData.gift_id),
        activity_variable: Number(this.formData.activity_variable)
      }
      data = Object.assign({}, { ...this.formData }, data)
      const apiName = postInsertOrUpdateApi
      apiName(data, Number(this.formData.id)).then((res) => {
        this.isShowDialog = false
        if (res) {
          this.$message({
            type: 'success',
            message: res.error_msg
          })
          this.isCreateData ? this.onTriggerQuery() : this.getIceBreak()
        }
      })
    },
    // 触发查询数据
    onTriggerQuery() {
      this.pageData.page = 1
      this.pageKey += 1
      this.postQueryMenuByPageList()
    },
    // 分页
    handlePageChange() {
      this.postQueryMenuByPageList()
    }
  }
}
</script>
