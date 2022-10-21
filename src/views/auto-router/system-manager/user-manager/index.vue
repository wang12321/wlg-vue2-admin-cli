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
import { REQUIRED } from '@/utils/reg/validate'
import { roleType } from '@/utils/type-map'
import { usersModule } from '@/services/api'
const { postUserQueryAdminUserByPageApi, postUserInsertOrUpdateApi } = usersModule
export default {
  name: 'Index',
  meta: {
    title: '用户管理',
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
        roleCode: [REQUIRED('角色名称')],
        roleName: [REQUIRED('角色编码')]
      },
      searchData: {},
      formData: {},
      operates: {
        isButton: false,
        width: '240px',
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
            label: '更多操作',
            show: true,
            type: 'dropdown',
            icon: 'el-icon-edit',
            dropdownList: [
              {
                name: '重置密码',
                method: (index, row) => {
                  console.log(index, row)
                  alert('重置密码')
                }
              }, {
                name: '授权角色',
                method: (index, row) => {
                  console.log(index, row)
                  alert('授权角色')
                }
              }
            ],
            method: (index, row) => {
            }
          }
        ]
      },
      tableData: [],
      tableColumn: [
        {
          label: '用户名',
          showOverflowTooltip: true,
          prop: 'username',
          align: 'left',
          width: '100px'
        },
        {
          label: '电子邮箱',
          showOverflowTooltip: true,
          prop: 'email',
          align: 'left'
        },
        {
          label: '性别',
          showOverflowTooltip: true,
          prop: 'sex',
          align: 'left'
        },
        {
          label: '账号类型',
          showOverflowTooltip: true,
          prop: 'type',
          align: 'left'
        },
        {
          label: '账号状态',
          showOverflowTooltip: true,
          prop: 'status',
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
        { title: '用户名', placeholder: '请输入用户名称', key: 'username', type: 'input', clearable: true },
        { title: '登录密码', placeholder: '请输入登录密码', clearable: true, key: 'password', type: 'input' },
        { title: '是否父级账号', placeholder: '是否父级账号', clearable: true, key: 'isParent', type: 'select', options: roleType, label: 'label', value: 'value' },
        { title: '父级账号', placeholder: '请选择父级账号', clearable: true, key: 'parentId', type: 'input' },
        { title: '数据范围', placeholder: '请输入数据范围', clearable: true, key: 'responsibleArea', type: 'input' },
        { title: '状态', placeholder: '状态', clearable: true, key: 'status', type: 'input' },
        { title: '电子邮箱', placeholder: '请输入电子邮箱', clearable: true, key: 'email', type: 'input' },
        { title: '性别', placeholder: '请选择性别', clearable: true, key: 'sex', type: 'input' },
        { title: '账号类型', placeholder: '请选择账号类型', clearable: true, key: 'type', type: 'input' }
      ]
    },
    formOptions() {
      return [
        { titleShow: true, title: '用户名', placeholder: '请输入用户名称', key: 'username', type: 'input', clearable: true }
      ]
    }
  },
  mounted() {
    this.postUserQueryAdminUserByPageList()
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
      const apiName = postUserInsertOrUpdateApi
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
    postUserQueryAdminUserByPageList() {
      const data = {
        ...this.pageData,
        ...this.searchData
      }
      postUserQueryAdminUserByPageApi(data).then((res) => {
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
      this.postUserQueryAdminUserByPageList()
    },
    // 分页
    handlePageChange() {
      this.postUserQueryAdminUserByPageList()
    }
  }
}
</script>

