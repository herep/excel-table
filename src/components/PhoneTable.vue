<template>
  <div class="page-center-container">
    <!-- 筛选表单 -->
    <el-form :inline="true" class="search-form">
      <el-form-item>
        <el-input clearable placeholder="输入订单号,是全部订单中查" size="small" v-model="searchList.Oid"></el-input>
      </el-form-item>
      <el-form-item>
        <el-select size="small" clearable v-model="searchList.GroupHandle" placeholder="电话专员">
          <el-option
            v-for="item in specialistOptionsStatus"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select size="small" clearable v-model="searchList.Manufacturer" placeholder="发货状态">
          <el-option
            v-for="item in orderSendStatus"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-tooltip class="item" effect="dark" content="时间筛选是根据电联时间，不选择时候默认根据付款时间" placement="top">
          <i class="el-icon-warning"></i>
        </el-tooltip>
        <el-date-picker
          v-model="searchList.timeList"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" @click="initList">搜索</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" icon="el-icon-user" @click="dialogVisible = true">
          分配订单给专员
        </el-button>
      </el-form-item>
    </el-form>

    <!-- 表格 -->
    <el-table :data="tableData"
              border
              :cell-style="columnStyle"
              class="centered-table">
      <el-table-column type="selection" width="" align="center"></el-table-column>
      <el-table-column prop="shop_name" label="店铺名" width="150" sortable align="center"></el-table-column>
      <el-table-column prop="oid" label="订单编号" align="center"  width="180"></el-table-column>
      <el-table-column prop="pic_url" label="规格信息" width="200" align="">
        <template slot-scope="scope">
          <div class="images">
            <div  class="image-middle">
              <el-card shadow="hover" :body-style="{ padding: '10px' }">
                <el-image
                  :src="scope.row.pic_url"
                  :preview-src-list="[scope.row.pic_url]"
                  style="width:100px;height:100px;"/>
                <div style="text-align:center;padding-top:12px">
                  <span>{{scope.row.color_name}}</span>
                </div>
              </el-card>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="seller_status" label="回访信息" width="1000"  align="center">
        <template slot-scope="scope">
          <el-descriptions class="margin-top" :column="2"  border title="回访信息 (如需编辑点击右侧按钮)">
            <el-descriptions-item :contentStyle="{
              'text-align': 'center',  //文本居中
              'height': '20px',
              'word-break': 'break-all'  //过长时自动换行
      }" :label-style="{
              'width': '80px',   //最小宽度
              'background': '#d3e9f5',
              'word-break': 'break-all'  //过长时自动换行
      }">
              <template slot="label">
                <i class="el-icon-s-order"></i>
                标题
              </template>
              {{scope.row.title}}
            </el-descriptions-item>
            <el-descriptions-item :contentStyle="{
              'text-align': 'center',  //文本居中
              'height': '15px',
              'word-break': 'break-all'  //过长时自动换行
      }" :label-style="{
              'width': '75px',   //最小宽度
              'background': '#E6A23C',
              'word-break': 'break-all'  //过长时自动换行
      }">
              <template slot="label">
                <i class="el-icon-user-solid"></i>
                专员
              </template>
              {{scope.row.group_handle}}
            </el-descriptions-item>
          </el-descriptions>
          <el-descriptions class="margin-top" :column="2" border >
            <el-descriptions-item :contentStyle="{
               'text-align': 'center',  //文本居中
              'height': '15px',
              'word-break': 'break-all'  //过长时自动换行
      }" :label-style="{
              'width': '120px',   //最小宽度
              'background': '#f2f7ed',
      }">
              <template slot="label">
                <i class="el-icon-warning"></i>
                操作
              </template>
              {{sellerMemo(scope.row.seller_memo)}}
            </el-descriptions-item >
            <el-descriptions-item :contentStyle="{
              'text-align': 'center',  //文本居中
              'height': '15px',
              'word-break': 'break-all'  //过长时自动换行
      }" :label-style="{
              'width': '120px',   //最小宽度
              'background': '#cfdedf',
              'word-break': 'break-all'  //过长时自动换行
      }">
              <template slot="label">
                <i class="el-icon-phone"></i>
                号码
              </template>
              {{formattedPhone(scope.row.seller_memo)}}
            </el-descriptions-item>
          </el-descriptions>
          <el-descriptions class="margin-top" :column="1"  border>
            <el-descriptions-item :contentStyle="{
              'text-align': 'center',  //文本居中
              'height': '20px',
              'word-break': 'break-all'  //过长时自动换行
      }" :label-style="{
              'width': '80px',   //最小宽度
              'background': '#d3e9f5',
              'word-break': 'break-all'  //过长时自动换行
      }">
              <template slot="label">
                <i class="el-icon-s-order"></i>
                备注
              </template>
              {{scope.row.seller_memo}}
            </el-descriptions-item>
          </el-descriptions>
          <el-descriptions class="margin-top" :column="3"  border>
            <el-descriptions-item :contentStyle="{
              'text-align': 'center',  //文本居中
              'height': '20px',
              'word-break': 'break-all'  //过长时自动换行
      }" :label-style="{
              'width': '100px',   //最小宽度
              'background': '#a7d3eb',
              'word-break': 'break-all'  //过长时自动换行
      }">
              <template slot="label">
                <i class="el-icon-menu"></i>
                状态
              </template>
              <span v-if="scope.row.seller_flag_tag === '1'" style="color: green;">❌ 买家电话空号</span>
              <span v-else-if="scope.row.seller_flag_tag  === '2'" style="color: gray;">⚠️ 买家电话未接通</span>
              <span v-else-if="scope.row.seller_flag_tag  === '3'">
                  <el-tag type="warning">✅ 已告知买家</el-tag>
              </span>
              <span v-else>⏳ 未打电话与买家</span>
            </el-descriptions-item>
            <el-descriptions-item :contentStyle="{
              'text-align': 'center',  //文本居中
              'height': '20px',
              'word-break': 'break-all'  //过长时自动换行
      }" :label-style="{
              'width': '100px',   //最小宽度
              'background': '#a7d3eb',
              'word-break': 'break-all'  //过长时自动换行
      }">
              <template slot="label">
                <i class="el-icon-alarm-clock"></i>
                创建时间
              </template>
              {{scope.row.create_time}}
            </el-descriptions-item>
            <el-descriptions-item :contentStyle="{
              'text-align': 'center',  //文本居中
              'height': '20px',
              'word-break': 'break-all'  //过长时自动换行
      }" :label-style="{
              'width': '100px',   //最小宽度
              'background': '#a7d3eb',
              'word-break': 'break-all'  //过长时自动换行
      }">
              <template slot="label">
                <i class="el-icon-alarm-clock"></i>
                电联时间
              </template>
              {{scope.row.update_time}}
            </el-descriptions-item>
          </el-descriptions>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="250" align="center">
        <template slot-scope="scope">
          <el-row :gutter="20">
            <el-col :span="10"><div class="grid-content bg-purple">
              <el-button type="info" plain @click="handleUpdateSellerMemo(scope.row,'1','(空号)')">为空号</el-button>
            </div></el-col>
            <el-col :span="10"><div class="grid-content bg-purple">
              <el-button type="info" plain @click="handleUpdateSellerMemo(scope.row,'2','(未接通)@')">未接通</el-button>
            </div></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="10"><div class="grid-content bg-purple">
              <el-button type="warning" plain @click="handleUpdateSellerMemo(scope.row,'3','(已告知)')">已告知</el-button>
            </div></el-col>
            <el-col :span="10"><div class="grid-content bg-purple">
              <el-button type="warning" plain @click="dialogUpdateSellerMemo(scope.row)">自定义</el-button>
            </div></el-col>
          </el-row>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination @current-change="pnChange" @size-change="handleSizeChange" :current-page.sync="searchList.pn"
                   :page-sizes="[10,20, 30, 40, 50,100,300,500,1000]"
                   :page-size="page_size" background layout="total, sizes, prev, pager, next, jumper" :total="searchList.total"
                   class="pagination">
    </el-pagination>

    <!--自定义备注-->
    <el-dialog title="提交自定义备注" :visible.sync="upSeller" show-close width="500" :close-on-click-modal="false">
      <el-form label-width="40px" :model="formUpSid">
        <el-form-item label="备注" label-width="80px">
          <el-input placeholder="提交自定义备注内容" v-model="typeUpStr" label-width="80px"></el-input>
        </el-form-item>
        <el-form-item label-width="80px">
          <el-button type="primary" @click="handleUpdateSellerMemo(formUpSid,'3','(' + typeUpStr + ')')" style="width:260px;">提交
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!--分配专员-->
    <el-dialog
      title="选择参与分配的专员"
      :visible.sync="dialogVisible"
      width="400px">
      <el-tooltip class="item" effect="dark" content="不需要勾选订单，默认分配从来没被分配过得订单" placement="top">
        <i class="el-icon-warning"></i>
      </el-tooltip>
      <div style="margin-bottom: 20px;">请选择负责本次订单分配的专员（可多选）：</div>

      <el-checkbox-group v-model="selectedSpecialists" class="vertical-group">
        <el-checkbox
          v-for="item in specialistOptions"
          :key="item"
          :label="item"
          border>
          {{ item }}
        </el-checkbox>
      </el-checkbox-group>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<style scoped>
/* “Tissue Search”字体样式 */
/* 图片总布局，样式 */
.images{
  display: flex;
  margin-top: 20px;
  margin-left: 21px;
  margin-right: 20px;
  flex-wrap: wrap;
  font-weight: 600;
}
/* 图片之间 */
.image-middle{
  margin-right: 15px;
  margin-bottom: 15px;
}
/* 单张图片样式 */
.image{
  width:80px;
  height: 80px;
}

/* 外层容器：负责整体居中 */
.page-center-container {
  display: flex;
  flex-direction: column;
  align-items: center;       /* 水平居中 */
  justify-content: flex-start; /* 内容从顶部开始（避免垂直居中导致空白太多）*/
  min-height: 100vh;
  padding: 30px 20px;
  box-sizing: border-box;
  background-color: #f5f7fa;
}

/* 表单样式 */
.search-form {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
  margin-bottom: 20px;
}

/* 表格：关键！限制宽度 */
.centered-table {
  width: 100%;              /* 在容器内占满 */
  max-width: 1820px;        /* 但不超过 1200px（可调整）*/
  margin: 0 auto;           /* 水平居中（在 .page-center-container 内）*/
}

/* 分页：同样居中 */
.pagination {
  margin-top: 20px;
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: center;
}

.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
}
.vertical-group .el-checkbox {
  display: block;    /* 每个专员占一行 */
  margin-left: 0 !important; /* 核心：去掉默认左边距 */
  margin-bottom: 10px;
  width: 350px;      /* 固定一个宽度，防止“超长” */
}
</style>

<script>
import moment from "moment";
import {
  fGMessageBatchUpdateStarAndRemark, fGMessageUp,
  HFOrderGetList, HFOrderUpdate,UpGroupHandleOrOrderArr
} from '../api/api'

export default {
  name: "AdminRefundList",
  data() {
    return {
      dialogVisible: false, // 控制弹窗显示
      submitting: false,    // 防止重复提交
      // 预设的四个专员
      specialistOptions: ['骆骆', '晴晴', '蕊蕊', '悦悦','萌萌'],
      specialistOptionsStatus: [
        {
          value: "骆骆",
          label: '骆骆',
        },
        {
          value: "晴晴",
          label: '晴晴',
        },
        {
          value: "蕊蕊",
          label: '蕊蕊',
        },
        {
          value: "萌萌",
          label: '萌萌',
        },
      ],
      // 用户选中的专员列表
      selectedSpecialists: [],
      tableData: [],
      loading: false,
      page_size:50,
      typeUpStr:"",
      total: 0,
      upSeller:false,
      beginTimeStr:"",
      endTimeStr:"",
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      searchList: {
        Oid:"",
        Manufacturer: "",
        timeList: [],
        pn: 1,
        GroupHandle:""
      },//时间赛选 - 状态赛选 空：未打过 1.空号 2.未接通 3.已告知
      orderSendStatus: [
        {
          value: "",
          label: '未打电话',
        },
        {
          value: "1",
          label: '空号',
        },
        {
          value: "2",
          label: '未接通',
        },
        {
          value: "3",
          label: '已告知',
        },
      ],
      formUpSid:{
        "tid":"",
        "notes":"",
        "remark":"",
        "type":"1",
        "remark_type":3
      },
    }
  },

  created() {
    this.initList()
  },

  methods: {
    initList(){
      if(this.searchList.timeList[0] === undefined){
        this.beginTimeStr = ""
        this.endTimeStr = ""
      }else {
        this.beginTimeStr = moment(this.searchList.timeList[0]).format('YYYY-MM-DD 00:00:00')
        this.endTimeStr = moment(this.searchList.timeList[1]).format('YYYY-MM-DD 23:59:59')
      }

      let params = {
        page: this.searchList.pn,
        pageSize: this.page_size,
        beginTime: this.beginTimeStr,
        endTime: this.endTimeStr,
        manufacturer: this.searchList.Manufacturer,
        oid:this.searchList.Oid,
        groupHandleStr:this.searchList.GroupHandle,
      }
      document.title = `回访电话`;
      HFOrderGetList(params).then(res => {
        this.tableData = res.data;
        this.searchList.total = res.counts;
      })
    },
    handleConfirm() {
      const params = {
        groupHandleArr: this.selectedSpecialists
      };
      console.log("提交参数：", params);
      this.dialogVisible = false;

      UpGroupHandleOrOrderArr(params).then(res => {
        if (res.msg === "success") {
          this.$notify({
            title: '成功',
            message: '备注成功',
            type: 'success'
          });
          console.log(res.data);
        }else{
          this.$notify({
            title: '错误',
            message: '备注失败了',
          });
        }
      })
    },
    handleUpdateSellerMemo(list,typeUp,typeUpText){
      this.$confirm('此操作会同步订单备注, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = {
          oid:list.oid,
          manufacturer:typeUp,
          sid:this.replacedText(list.seller_memo,typeUpText)
        }

        console.log("params:",params)

        HFOrderUpdate(params).then(res => {
          if (res.msg === "success") {
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success'
            });
            this.formUpSid.tid = list.oid
            this.formUpSid.remark = this.replacedText(list.seller_memo,typeUpText)

            console.log("formUpSid:",this.formUpSid)
            fGMessageBatchUpdateStarAndRemark(this.formUpSid).then(res => {
              if (res.msg === "success") {
                this.$notify({
                  title: '成功',
                  message: '备注成功',
                  type: 'success'
                });

                if (this.upSeller === true){
                  this.upSeller = false
                }
              }else{
                this.$notify({
                  title: '错误',
                  message: '备注失败了',
                });
              }
            })
            //订单备注
            this.initList()
          }else{
            this.$notify({
              title: '错误',
              message: '更新失败了',
            });
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        });
      });
    },
    dialogUpdateSellerMemo(row){
      //打开输入框 初始化信息
      let _this = this
      _this.upSeller = true

      this.formUpSid.oid = row.oid
      this.formUpSid.seller_memo = row.seller_memo
    },
    formattedPhone(address) {
      // 正则：匹配 [四位数字]
      const codeMatch = address.match(/\[(\d{4})]/);
      // 正则：匹配中国大陆手机号
      const phoneMatch = address.match(/(1[3-9]\d{9})/);

      const code = codeMatch ? codeMatch[1] : '';
      const phone = phoneMatch ? phoneMatch[1] : '';

      if (phone && code) {
        return `${phone}-${code}`;
      }
      return ''; // 未匹配到则返回空
    },
    sellerMemo(text) {
      const match = text.match(/^@([^-]+)/);
      return match ? match[1] : ''; // match[1] 是捕获组内容
    },
    pnChange(val) {
      this.searchList.pn = val
      this.initList()
    },
    handleSizeChange(val) {
      this.page_size = val
      this.initList()
    },
    replacedText(sellerMemo,upText) {
      // 替换所有 @ 为 （已拍）
      return sellerMemo.replace(/@/g, upText);
    },
    columnStyle({row, column, rowIndex, columnIndex}) {
      if (row.seller_flag_tag === "1") {
        return 'background:	#F56C6C;'
      }

      if (row.seller_flag_tag === "2") {
        return 'background:	#e7f097;'
      }

      if (row.seller_flag_tag === "3") {
        return 'background:	#b3fcf5;'
      }

    },
  },
}
</script>
