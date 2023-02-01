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
            <el-button type="primary" @click="add">新增</el-button>
            <el-button type="primary">批量删除</el-button>
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
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="55"
          />
        </TableComponent>
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
import { REQUIRED } from '../../utils/reg/validate'
import { roleType } from '../../utils/type-map'
import { roleModule } from '../../services/api'
const { postRoleQueryRoleByPageApi, postRoleInsertOrUpdateApi } = roleModule
export default {
  name: 'Index',
  data() {
    return {
      isCreateData: true,
      isShowDialog: false,
      pageKey: 0, // 刷新分页组件key
      total: 0,
      giftIDList: [],
      rules: {
        roleCode: [REQUIRED('角色名称')],
        roleName: [REQUIRED('角色编码')]
      },
      searchData: {},
      formData: {},
      operates: {
        isButton: false,
        width: '220px',
        label: '操作',
        align: 'left',
        list: [
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
          },
          {
            label: '授权菜单',
            show: true,
            icon: 'el-icon-edit',
            method: (index, row) => {
              this.formData = { ...row }
              this.isCreateData = false
              this.isShowDialog = true
            }
          }
        ]
      },
      tableData: [],
      tableColumn: [
        {
          label: 'ID',
          showOverflowTooltip: true,
          prop: 'id',
          align: 'left',
          width: '100px'
        },
        {
          label: '角色名称',
          showOverflowTooltip: true,
          prop: 'roleName',
          align: 'left'
        },
        {
          label: '角色编码',
          showOverflowTooltip: true,
          prop: 'roleCode',
          align: 'left'
        },
        {
          label: '角色描述',
          showOverflowTooltip: true,
          prop: 'remark',
          align: 'left'
        },
        {
          label: '角色类型',
          showOverflowTooltip: true,
          prop: 'roleType',
          align: 'left'
        }
      ],
      options: {
        loading: false,
        border: true
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
        { title: '角色名称', placeholder: '请输入角色名称', key: 'roleName', type: 'input', clearable: true },
        { title: '角色编码', placeholder: '请输入角色编码', clearable: true, key: 'roleCode', type: 'input' },
        { title: '角色类型', placeholder: '请选择角色类型', clearable: true, key: 'roleType', type: 'select', options: roleType, label: 'label', value: 'value' },
        { title: '角色描述', placeholder: '请输入角色描述', clearable: true, key: 'remark', type: 'input' }
      ]
    },
    formOptions() {
      return [
        { titleShow: true, title: '角色名称', placeholder: '请输入角色名称', key: 'roleName', type: 'input', clearable: true },
        { titleShow: true, title: '角色编码', placeholder: '请输入角色编码', clearable: true, key: 'roleCode', type: 'input' },
        { titleShow: true, title: '角色类型', placeholder: '请选择角色类型', clearable: true, key: 'roleType', type: 'select', options: roleType, label: 'label', value: 'value' }
      ]
    }
  },
  mounted() {
    this.postRoleQueryRoleByPageList()
  },
  methods: {
    handleSelectionChange(val) {
      console.log(12312, val)
      // this.multipleSelection = val
    },
    add() {
      this.formData = {
        game_id: Number(this.$store.state.permission.gameId)
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
      const apiName = postRoleInsertOrUpdateApi
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
    // 数据请求
    postRoleQueryRoleByPageList() {
      const data = {
        ...this.pageData,
        ...this.searchData
      }
      postRoleQueryRoleByPageApi(data).then((res) => {
        console.log(12, res)
        if (res && res.data) {
          this.tableData = res.data.records || []
          this.total = res.data.total
        }
      })
    },
    // 触发查询数据
    onTriggerQuery() {
      this.pageData.page = 1
      this.pageKey += 1
      this.postRoleQueryRoleByPageList()
    },
    // 分页
    handlePageChange() {
      this.postRoleQueryRoleByPageList()
    }
  }
}
</script>

