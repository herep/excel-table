<template>
  <div>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-select size="small" clearable v-model="searchList.orderSendStatusVal" placeholder="发货状态">
          <el-option
            v-for="item in orderSendStatus"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input clearable placeholder="请输入订单号" size="small" v-model="searchList.oid"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input clearable placeholder="请输入运单号" size="small" v-model="searchList.sid"></el-input>
      </el-form-item>
      <el-form-item>
        <el-date-picker size="small" v-model="searchList.timeList" type="daterange" align="right"
                        value-format="yyyy-MM-dd" unlink-panels range-separator="至"
                        start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" @click="initList">搜索</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" @click="handleCreate">新增手工单</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" @click="triggerShopSort('ascending')">按店铺排序</el-button>
      </el-form-item>
    </el-form>

    <el-table v-loading="loading" border ref="tableData" :data="tableData" style="width: 100%"   header-align="center" :cell-style="columnStyle" :row-style="{height:'60px'}">
      <el-table-column type="selection" width="" align="center"></el-table-column>
      <el-table-column
        prop="shop_name"
        label="店铺名"
        class-name="hide-column"      label-class-name="hide-column" width="1"
        sortable="custom" > </el-table-column>
      <el-table-column prop="seller_status" label="订单信息" width="700"  align="center">
        <template slot-scope="scope">
          <el-descriptions class="margin-top" :column="1"  border title="订单信息 (如需编辑点击右侧按钮)">
            <el-descriptions-item :contentStyle="{
              'text-align': 'center',  //文本居中
              'height': '20px',
              'word-break': 'break-all'  //过长时自动换行
      }" :label-style="{
              'width': '80px',   //最小宽度
              'background': '#e9f4fa',
              'word-break': 'break-all'  //过长时自动换行
      }">
              <template slot="label">
                <i class="el-icon-s-management"></i>
                标题
              </template>
              {{scope.row.title}}
            </el-descriptions-item>
          </el-descriptions>
          <el-descriptions class="margin-top" :column="3" border>
            <el-descriptions-item :contentStyle="{
              'text-align': 'center',  //文本居中
              'height': '20px',
              'width': '200px',   //最小宽度
              'word-break': 'break-all'  //过长时自动换行
      }" :label-style="{
              'width': '90px',   //最小宽度
              'background': '#cfdedf',
              'word-break': 'break-all'  //过长时自动换行
      }">
              <template slot="label">
                <i class="el-icon-s-order"></i>
                订单号
              </template>
              {{scope.row.oid}}
            </el-descriptions-item>
            <el-descriptions-item :contentStyle="{
              'text-align': 'center',  //文本居中
              'height': '20px',
              'width': '50px',   //最小宽度
      }" :label-style="{
              'width': '80px',   //最小宽度
              'background': '#f2f7ed',
      }">
              <template slot="label">
                <i class="el-icon-coin"></i>
                数量
              </template>
              {{scope.row.num}}
            </el-descriptions-item >
            <el-descriptions-item :contentStyle="{
              'text-align': 'center',  //文本居中
              'height': '20px',
              'width': '170px',   //最小宽度
              'word-break': 'break-all'  //过长时自动换行
      }" :label-style="{
              'width': '100px',   //最小宽度
              'background': '#cfdedf',
              'word-break': 'break-all'  //过长时自动换行
      }">
              <template slot="label">
                <i class="el-icon-location-information  "></i>
                收货地址
              </template>
              {{scope.row.receiver_province}}-{{scope.row.receiver_city}}
            </el-descriptions-item>
          </el-descriptions>
          <el-descriptions class="margin-top" :column="3" border>
            <el-descriptions-item :contentStyle="{
              'text-align': 'center',  //文本居中
              'height': '20px',
              'width': '80px',   //最小宽度
      }" :label-style="{
              'width': '100px',   //最小宽度
              'background': '#f2f7ed',
      }">
              <template slot="label">
                <i class="el-icon-guide"></i>
                厂家
              </template>
              {{scope.row.manufacturer}}
            </el-descriptions-item >
            <el-descriptions-item :contentStyle="{
              'text-align': 'center',  //文本居中
              'height': '20px',
              'word-break': 'break-all'  //过长时自动换行
      }" :label-style="{
              'width': '100px',   //最小宽度
              'background': '#cfdedf',
              'word-break': 'break-all'  //过长时自动换行
      }">
              <template slot="label">
                <i class="el-icon-s-shop"></i>
                店铺
              </template>
              {{scope.row.shop_name}}
            </el-descriptions-item>
            <el-descriptions-item :contentStyle="{
              'text-align': 'center',  //文本居中
              'height': '20px',
              'width': '80px',   //最小宽度
      }" :label-style="{
              'width': '80px',   //最小宽度
              'background': '#f2f7ed',
      }">
              <template slot="label">
                <i class="el-icon-s-finance"></i>
                金额
              </template>
              {{scope.row.payment}}
            </el-descriptions-item >
          </el-descriptions>
          <el-descriptions class="margin-top" :column="2"  border>
            <el-descriptions-item :contentStyle="{
              'text-align': 'center',  //文本居中
              'height': '20px',
              'word-break': 'break-all'  //过长时自动换行
      }" :label-style="{
              'width': '80px',   //最小宽度
              'background': '#e9f4fa',
              'word-break': 'break-all'  //过长时自动换行
      }">
              <template slot="label">
                <i class="el-icon-shopping-cart-1"></i>
                车型
              </template>
              {{scope.row.car_model}}
            </el-descriptions-item>
            <el-descriptions-item :contentStyle="{
              'text-align': 'center',  //文本居中
              'height': '20px',
              'word-break': 'break-all'  //过长时自动换行
      }" :label-style="{
              'width': '100px',   //最小宽度
              'background': '#e9f4fa',
              'word-break': 'break-all'  //过长时自动换行
      }">
              <template slot="label">
                <i class="el-icon-truck"></i>
                运单号
              </template>
              {{scope.row.car_model}}
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
                <i class="el-icon-collection-tag"></i>
                备注
              </template>
              {{scope.row.seller_memo}}
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
                更新时间
              </template>
              {{scope.row.create_time}}
            </el-descriptions-item>
          </el-descriptions>
        </template>
      </el-table-column>
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
      <el-table-column prop="img_struct" label="车型实拍图"  align="center" width="1000">
        <template slot-scope="scope">
          <div class="images">
            <div v-for="(item, index) in scope.row.img_struct" :key="index" class="image-middle" >
              <el-card shadow="hover" :body-style="{ padding: '2px' }">
                <el-image
                  v-if="scope.row.img_struct[index].url !== ''"
                  :src="scope.row.img_struct[index].url"
                  :preview-src-list="[scope.row.img_struct[index].url]"
                  class="image"/>
              </el-card>
            </div>
            <el-descriptions class="margin-top" :column="3"  border>
              <el-descriptions-item :contentStyle="{
              'text-align': 'center',  //文本居中
              'height': '10px',
              'width': '500px',
              'word-break': 'break-all'  //过长时自动换行
      }" :label-style="{
              'width': '80px',   //最小宽度
              'background': '#f1fdfd',
              'word-break': 'break-all'  //过长时自动换行
      }">
                <template slot="label">
                  <i class="el-icon-map-location"></i>
                  地址
                </template>
                {{scope.row.receiver}}
              </el-descriptions-item>
              <el-descriptions-item :contentStyle="{
              'text-align': 'center',  //文本居中
              'height': '10px',
              'width': '100px',
              'word-break': 'break-all'  //过长时自动换行
      }" :label-style="{
              'width': '100px',   //最小宽度
              'background': '#f1fdfd',
              'word-break': 'break-all'  //过长时自动换行
      }">
                <template slot="label">
                  <i class="el-icon-s-flag"></i>
                  面单类型
                </template>
                {{scope.row.sidType}}
              </el-descriptions-item>
              <el-descriptions-item :contentStyle="{
              'text-align': 'center',  //文本居中
              'height': '10px',
              'width': '100px',
              'word-break': 'break-all'  //过长时自动换行
      }" :label-style="{
              'width': '100px',   //最小宽度
              'background': '#fdd1ca',
              'word-break': 'break-all'  //过长时自动换行
      }">
                <template slot="label">
                  <i class="el-icon-shopping-cart-full"></i>
                  退款状态
                </template>
                {{scope.row.refund_status}}
              </el-descriptions-item>
            </el-descriptions>
            <el-descriptions class="margin-top" :column="2"  border>
              <el-descriptions-item :contentStyle="{
              'text-align': 'center',  //文本居中
              'height': '20px',
              'width': '800px',
              'word-break': 'break-all'  //过长时自动换行
      }" :label-style="{
              'width': '120px',   //最小宽度
              'background': '#e9f4fa',
              'word-break': 'break-all'  //过长时自动换行
      }">
                <template slot="label">
                  <i class="el-icon-truck"></i>
                  厂家备注
                </template>
                {{scope.row.seller_status}}
              </el-descriptions-item>
              <el-descriptions-item :contentStyle="{
              'text-align': 'center',  //文本居中
              'height': '20px',
              'width': '100px',
              'word-break': 'break-all'  //过长时自动换行
      }" :label-style="{
              'width': '120px',   //最小宽度
              'background': '#e9f4fa',
              'word-break': 'break-all'  //过长时自动换行
      }">
                <template slot="label">
                  <i class="el-icon-edit-outline"></i>
                  客服处理
                </template>
                <el-tooltip class="item" effect="dark" content="厂家请勿点击操作此处，如需编辑请点击右侧按钮，此处是商家处理厂家备注" placement="top">
                  <el-button type="text" plain @click="handleEdit(scope.row)"  :disabled="scope.row.settlement_status === 1">厂家勿点</el-button>
                </el-tooltip>
              </el-descriptions-item>
            </el-descriptions>

          </div>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="250" align="center" fixed="right">
        <template slot-scope="scope">
          <el-row :gutter="20">
            <el-col :span="10"><div class="grid-content bg-purple">
              <el-button type="info" plain @click="handleUpdateSid(scope.row)">编辑运单</el-button>
            </div></el-col>
            <el-col :span="10"><div class="grid-content bg-purple">
              <el-button type="info" plain @click="handleUpdateCarModel(scope.row)">编辑车型</el-button>
            </div></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="10"><div class="grid-content bg-purple">
              <el-button type="warning" plain @click="handleUpdateSellerMemo(scope.row)">编辑备注</el-button>
            </div></el-col>
            <el-col :span="10"><div class="grid-content bg-purple">
              <el-button type="primary" plain @click="handleUpdatePayment(scope.row)">编辑金额</el-button>
            </div></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="10"><div class="grid-content bg-purple">
              <el-button type="primary" @click="handleEdit(scope.row)" icon="el-icon-edit" round></el-button>
            </div></el-col>
            <el-col :span="10"><div class="grid-content bg-purple">
              <el-button type="danger" @click="handleDel(scope.row)" icon="el-icon-delete" round></el-button>
            </div></el-col>
          </el-row>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination @current-change="pnChange" @size-change="handleSizeChange" :current-page.sync="searchList.pn"
                   :page-sizes="[10,20, 30, 40, 50,100,300,500,1000]"
                   :page-size="page_size" background layout="total, sizes, prev, pager, next, jumper" :total="searchList.total"
                   style="text-align:right;margin:10px 0;">
    </el-pagination>
    <!--修改信息-->
    <el-dialog title="编辑发货信息" :visible.sync="dialogTask" show-close width="500" :close-on-click-modal="false">
      <el-form label-width="40px" :model="formLabelAlign">
        <el-form-item label="厂家备注" label-width="80px">
          <el-input placeholder="请输入处理结果" v-model="upSellerStatusData" label-width="80px"></el-input>
        </el-form-item>
        <el-form-item label="地址" label-width="80px">
          <el-input placeholder="请输入收货地址" v-model="formLabelAlign.receiver" label-width="80px"></el-input>
        </el-form-item>
        <el-form-item label="规格图片" label-width="80px">
          <el-upload
            action="http://kww.zsfqlm.com/api/cooperationrecharge/bankcardimg"
            :on-success="(response) => handleSuccess_More_pic_url(response)"
            :headers="importHeaders"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove_pic_url">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label="实拍图" label-width="80px">
          <el-upload
            action="http://kww.zsfqlm.com/api/cooperationrecharge/bankcardimg"
            :on-success="(response) => handleSuccess_More(response)"
            :headers="importHeaders"
            :file-list="formLabelAlign.img_struct"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label-width="80px">
          <el-button type="primary" @click="updateOrder()" style="width:260px;">提交
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--新增手工单-->
    <el-dialog title="新增手工单信息" :visible.sync="newDialogTask" show-close width="500" :close-on-click-modal="false">
      <el-form label-width="40px">
        <el-form-item label="店铺名" label-width="80px">
          <el-input placeholder="请输入店铺名" v-model="newFormLabelAlign.shop_name" label-width="80px"></el-input>
        </el-form-item>
        <el-form-item label="订单号" label-width="80px">
          <el-input placeholder="请输入订单号" v-model="newFormLabelAlign.oid" label-width="80px"></el-input>
        </el-form-item>
        <el-form-item label="收货地址" label-width="80px">
          <el-input placeholder="请输入收货地址" v-model="newFormLabelAlign.receiver" label-width="80px"></el-input>
        </el-form-item>
        <el-form-item label="厂家名" label-width="80px">
          <el-input placeholder="请输入厂家名" v-model="newFormLabelAlign.manufacturer" label-width="80px"></el-input>
        </el-form-item>
        <el-form-item label="规格名称" label-width="80px">
          <el-input placeholder="请输入规格名称" v-model="newFormLabelAlign.color_name" label-width="80px"></el-input>
        </el-form-item>
        <el-form-item label="备注" label-width="80px">
          <el-input placeholder="请输入备注" v-model="newFormLabelAlign.seller_status" label-width="80px"></el-input>
        </el-form-item>
        <el-form-item label="面单类型" label-width="90px">
          <el-select v-model="newFormLabelAlign.sidType" placeholder="请选择活动区域">
            <el-option label="抖音面单" value="抖音面单"></el-option>
            <el-option label="淘宝面单" value="淘宝面单"></el-option>
            <el-option label="拼多多面单" value="拼多多面单"></el-option>
            <el-option label="快手面单" value="快手面单"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规格图片" label-width="80px">
          <el-upload
            action="http://kww.zsfqlm.com/api/va/evaluate/evaluate_img"
            :on-success="(response) => handleSuccess_pic_url(response)"
            :headers="importHeaders"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label="实拍图" label-width="80px">
          <el-upload
            action="http://kww.zsfqlm.com/api/va/evaluate/evaluate_img"
            :on-success="(response) => handleSuccess_Img(response)"
            :headers="importHeaders"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label-width="80px">
          <el-button type="primary" @click="createOrder()" style="width:260px;">提交
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--修改车型-->
    <el-dialog title="编辑车型" :visible.sync="upCarModel" show-close width="500" :close-on-click-modal="false">
      <el-form label-width="40px" :model="formLabelAlign">
        <el-form-item label="车型" label-width="80px">
          <el-input placeholder="请输入车型" v-model="formLabelAlign.car_model" label-width="80px"></el-input>
        </el-form-item>
        <el-form-item label-width="80px">
          <el-button type="primary" @click="upCarModelInfo()" style="width:260px;">提交
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--修改运单号-->
    <el-dialog title="提交运单号发货" :visible.sync="upSid" show-close width="500" :close-on-click-modal="false">
      <el-form label-width="40px" :model="formLabelAlign">
        <el-form-item label="快递公司" label-width="90px">
          <el-select v-model="formUpSid.sidType" placeholder="请选择运单所属快递公司">
            <el-option label="中通" value="中通"></el-option>
            <el-option label="圆通" value="圆通"></el-option>
            <el-option label="韵达" value="韵达"></el-option>
            <el-option label="极兔速递" value="极兔速递"></el-option>
            <el-option label="申通" value="申通"></el-option>
            <el-option label="邮政快递包裹" value="顺丰"></el-option>
            <el-option label="德邦快递" value="德邦快递"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="运单号" label-width="80px">
          <el-input placeholder="请输入运单号" v-model="formUpSid.remark" label-width="80px"></el-input>
        </el-form-item>
        <el-form-item label-width="80px">
          <el-button type="primary" @click="upSidInfo()" style="width:260px;">提交
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--修改备注-->
    <el-dialog title="提交订单备注（无法发货原因）" :visible.sync="upSellerStatus" show-close width="500" :close-on-click-modal="false">
      <el-form label-width="40px" :model="formLabelAlign">
        <el-form-item label="备注" label-width="80px">
          <el-input placeholder="提交订单备注（无法发货原因）" v-model="formLabelAlign.seller_status" label-width="80px">{{ formLabelAlign.seller_status }}</el-input>
        </el-form-item>
        <el-form-item label-width="80px">
          <el-button type="primary" @click="upSellerStatusInfo()" style="width:260px;">提交
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--修改金额-->
    <el-dialog title="提交金额" :visible.sync="upPayment" show-close width="500" :close-on-click-modal="false">
      <el-form label-width="40px" :model="formLabelAlign">
        <el-form-item label="金额" label-width="80px">
          <el-input placeholder="提交采购金额" v-model="formLabelAlign.payment" label-width="80px"></el-input>
        </el-form-item>
        <el-form-item label-width="80px">
          <el-button type="primary" @click="upPaymentInfo()" style="width:260px;">提交
          </el-button>
        </el-form-item>
      </el-form>
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
/* 隐藏表体单元格 */
.el-table .hidden-col {
  display: none !important;
}
/* 隐藏表头单元格 */
.el-table th.hidden-col {
  display: none !important;
}
</style>

<script>
import moment from "moment";
import {fGMessageCreate, fGMessageGetList, fGMessageUp,fGMessageSendOrder,fGMessageBatchUpdateStarAndRemark} from '../api/api'

export default {
  name: "AdminRefundList",
  data() {
    return {
      tableData: [],
      orderSendStatus: [
        {
          value: 0,
          label: '全部',
        },
        {
          value: 1,
          label: '未发货',
        },
        {
          value: 2,
          label: '已发货',
        },
        {
          value: 3,
          label: '待处理',
        },
        {
          value: 4,
          label: '红色处理',
        },
      ],
      searchList: {
        searchValue: "",
        timeList: [new Date('2020-1-1 0:00:00'), new Date('2090-1-1 0:00:00')],
        pn: 1,
        total: 0,
        shop_name: "",
        oid:"",
        sid:"",
        orderSendStatusVal: 1,
      },
      page_size:50,
      page: 1,
      total: 0,
      loading: false,
      statusVal: 0,
      upCarModel:false,
      upSid:false,
      upSellerStatus:false,
      upPayment:false,
      dialogTask: false,
      newDialogTask: false,
      dialogVisible: false,
      dialogImageUrl: '',
      upSellerStatusData:'',
      //携带token
      importHeaders: {token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJiZWxvbmciOiJTdWJhY2NvdW50IiwiZXhwIjoxNzYwNDEzODI0LCJ1c2VyaWQiOjExNjR9.Dd0bb5qT-Z7OAqBexdTpswPjwBLMy8G2No7_ia0ty5Q"},
      imgMap:{
        name: "",
        url:"",
      },
      formLabelAlign:{
        "oid":"",
        "car_model":"",
        "receiver":"",
        "sid":"",
        "payment":"",
        "seller_status":"",
        "img_struct":[],
      },
      formUpCarModel:{
        "oid":"",
        "manufacturer":"",
        "remark":""
      },
      formUpSid:{
        "tid":"",
        "notes":"",
        "remark":"",
        "type":"",
        "sidType":"中通",
      },
      newFormImgArr:[],
      newFormLabelAlign:{
        "oid":"",
        "color_name":"",
        "pic_url":"",
        "img_arr":[],
        "shop_name":"",
        "manufacturer":"",
        "receiver":"",
        "seller_status":"",
        "status":0,
        "sidType":"抖音面单"
      },
    }
  },

  created() {
    this.initList()
  },

  methods: {
    initList() {
      const urlParams = new URLSearchParams(window.location.search);
      let params = {
        page: this.searchList.pn,
        pageSize: this.page_size,
        begin_time: moment(this.searchList.timeList[0]).format('YYYY-MM-DD 00:00:00'),
        end_time: moment(this.searchList.timeList[1]).format('YYYY-MM-DD 23:59:59'),
        manufacturer: urlParams.get('name'),
        oid: this.searchList.oid,
        sid: this.searchList.sid,
        orderSendStatusVal: this.searchList.orderSendStatusVal
      }
      document.title = `${params.manufacturer}-座套发货表格`;
      fGMessageGetList(params).then(res => {
        this.tableData = res.data;
        this.searchList.total = res.counts;
      })
    },
    handleEdit(row) {
      let _this = this
      _this.dialogTask = true
      this.formLabelAlign.oid = row.oid
      this.formLabelAlign.receiver = row.receiver
      this.formLabelAlign.sid = row.sid
      this.formLabelAlign.payment = row.payment
      this.formLabelAlign.car_model = row.car_model
      this.formLabelAlign.seller_memo = row.seller_memo
      this.formLabelAlign.seller_status = row.seller_status
      this.formLabelAlign.settlement_status = 1
      this.upSellerStatusData = ""

      if (row.img_struct[0].url === "") {
        this.formLabelAlign.img_struct = []
      } else {
        this.formLabelAlign.img_struct = row.img_struct
      }

    },
    handleDel(row) {
      this.$confirm('此操作将永久删除本条订单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.newFormLabelAlign.oid = row.oid
        this.newFormLabelAlign.receiver = row.receiver
        this.newFormLabelAlign.sid = row.sid
        this.newFormLabelAlign.payment = row.payment
        this.newFormLabelAlign.car_model = row.car_model
        this.newFormLabelAlign.seller_memo = row.seller_memo
        this.newFormLabelAlign.img_struct = row.img_struct
        this.newFormLabelAlign.seller_status = row.seller_status
        this.newFormLabelAlign.status = 1
        fGMessageUp(this.newFormLabelAlign).then(res => {
          if (res.msg === "success") {
            this.$notify({
              title: '成功',
              message: '删除手工单成功',
              type: 'success'
            });
            this.initList()
          } else {
            this.$notify({
              title: '错误',
              message: '删除手工单失败了',
            });
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    handleRemove(file, fileList) {
      this.formLabelAlign.img_struct = fileList
    },
    handleRemove_pic_url(file, fileList) {
      this.formLabelAlign.pic_url = ""
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleSuccess_More(response) {
      var param = {
        name: "实拍图",
        url: response.UrlImg
      }
      this.formLabelAlign.img_struct.push(param)
      console.log(this.formLabelAlign.img_struct)
    },
    handleSuccess_More_pic_url(response) {
      this.formLabelAlign.pic_url = response.UrlImg
    },
    handleSuccess_pic_url(response) {
      this.newFormLabelAlign.pic_url = response.UrlImg
    },
    handleSuccess_Img(response) {
      this.newFormLabelAlign.img_arr.push(response.UrlImg)
    },
    handleCreate() {
      let _this = this
      _this.newDialogTask = true
    },
    columnStyle({row, column, rowIndex, columnIndex}) {
      if (columnIndex === 1) {
        if (row.settlement_status === 1) {
          return 'background:	#f2f7ed;'
        }
      }
      if (columnIndex === 5) {
        if (row.settlement_status === 1) {
          return 'background:	#DCE2F1;'
        }
      }

      if (row.settlement_status === 2) {
        return 'background:	#F56C6C;'
      }

    },
    pnChange(val) {
      this.searchList.pn = val
      this.initList()
    },
    handleSizeChange(val) {
      this.page_size = val
      this.initList()
    },
    handleUpdateCarModel(row) {
      let _this = this
      _this.upCarModel = true
      const urlParams = new URLSearchParams(window.location.search);
      this.formUpCarModel.oid = row.oid
      this.formUpCarModel.manufacturer = urlParams.get('name')

      this.formLabelAlign.oid = row.oid
      this.formLabelAlign.car_model = row.car_model
      this.formLabelAlign.receiver = row.receiver
      this.formLabelAlign.sid = row.sid
      this.formLabelAlign.payment = row.payment
      this.formLabelAlign.seller_memo = row.seller_memo
      this.formLabelAlign.seller_status = row.seller_status
      this.formLabelAlign.settlement_status = row.settlement_status

      if (row.img_struct[0].url === "") {
        this.formLabelAlign.img_struct = []
      } else {
        this.formLabelAlign.img_struct = row.img_struct
      }
      console.log(this.formLabelAlign)
    },
    handleUpdateSid(row) {
      //打开输入框 初始化信息
      let _this = this
      _this.upSid = true

      this.formUpSid.tid = row.oid

      this.formLabelAlign.oid = row.oid
      this.formLabelAlign.sid = row.sid
      this.formLabelAlign.receiver = row.receiver
      this.formLabelAlign.payment = row.payment
      this.formLabelAlign.seller_memo = row.seller_memo
      this.formLabelAlign.car_model = row.car_model
      this.formLabelAlign.seller_status = row.seller_status
      this.formLabelAlign.settlement_status = row.settlement_status

      if (row.img_struct[0].url === "") {
        this.formLabelAlign.img_struct = []
      } else {
        this.formLabelAlign.img_struct = row.img_struct
      }

    },
    handleUpdateSellerMemo(row) {
      //打开输入框 初始化信息
      let _this = this
      _this.upSellerStatus = true

      this.formLabelAlign.oid = row.oid
      this.formLabelAlign.receiver = row.receiver
      this.formLabelAlign.payment = row.payment
      this.formLabelAlign.seller_memo = row.seller_memo
      this.formLabelAlign.seller_status = row.seller_status
      this.formLabelAlign.car_model = row.car_model
      this.formLabelAlign.sid = row.sid
      this.formLabelAlign.settlement_status = 2

      if (row.img_struct[0].url === "") {
        this.formLabelAlign.img_struct = []
      } else {
        this.formLabelAlign.img_struct = row.img_struct
      }

    },
    handleUpdatePayment(row) {
      //打开输入框 初始化信息
      let _this = this
      _this.upPayment = true

      this.formLabelAlign.oid = row.oid
      this.formLabelAlign.receiver = row.receiver
      this.formLabelAlign.payment = row.payment
      this.formLabelAlign.seller_memo = row.seller_memo
      this.formLabelAlign.car_model = row.car_model
      this.formLabelAlign.sid = row.sid
      this.formLabelAlign.settlement_status = row.settlement_status
      this.formLabelAlign.seller_status = row.seller_status

      if (row.img_struct[0].url === "") {
        this.formLabelAlign.img_struct = []
      } else {
        this.formLabelAlign.img_struct = row.img_struct
      }

    },
    updateOrder() {
      this.formLabelAlign.seller_status = "(问题：)" + this.formLabelAlign.seller_status + "（解决方式：）" + this.upSellerStatusData
      console.log("修改信息：", this.formLabelAlign)
      fGMessageUp(this.formLabelAlign).then(res => {
        if (res.msg === "success") {
          this.$notify({
            title: '成功',
            message: '更新成功',
            type: 'success'
          });
          this.dialogTask = false
          this.initList()
        } else {
          this.$notify({
            title: '错误',
            message: '更新失败了',
          });
        }
        console.log('res.Data', res)
      })
    },
    createOrder() {
      fGMessageCreate(this.newFormLabelAlign).then(res => {
        if (res.msg === "success") {
          this.$notify({
            title: '成功',
            message: '添加手工单成功',
            type: 'success'
          });
          this.newDialogTask = false
          this.initList()
        } else {
          this.$notify({
            title: '错误',
            message: '添加手工单失败了',
          });
        }
      })
      console.log(this.newFormLabelAlign);
    },
    upCarModelInfo() {

      this.formUpCarModel.remark = this.formLabelAlign.car_model
      console.log("修改车型信息：", this.formUpCarModel)
      console.log("修改车型信息formLabelAlign：", this.formLabelAlign)
      fGMessageSendOrder(this.formUpCarModel).then(res => {
        if (res.data === "Success") {
          this.$notify({
            title: '成功',
            message: '推送订单成功',
            type: 'success'
          });

          this.formLabelAlign.sid = "已推送" + this.formUpCarModel.remark
          fGMessageUp(this.formLabelAlign).then(res => {
            if (res.msg === "success") {
              this.$notify({
                title: '成功',
                message: '更新成功',
                type: 'success'
              });
              this.upCarModel = false
              this.initList()
            } else {
              this.$notify({
                title: '错误',
                message: '更新失败了',
              });
            }
            console.log('res.Data', res)
          })
        } else {
          this.$notify({
            title: '错误',
            message: res.data,
          });
        }
      })
    },
    upSellerStatusInfo() {
      console.log("修改备注信息：", this.formLabelAlign)
      fGMessageUp(this.formLabelAlign).then(res => {
        if (res.msg === "success") {
          this.$notify({
            title: '成功',
            message: '更新成功',
            type: 'success'
          });
          this.upSellerStatus = false
          this.initList()
        } else {
          this.$notify({
            title: '错误',
            message: '更新失败了',
          });
        }
        console.log('res.Data', res)
      })
    },
    upPaymentInfo() {
      console.log("修改金额信息：", this.formLabelAlign)
      fGMessageUp(this.formLabelAlign).then(res => {
        if (res.msg === "success") {
          this.$notify({
            title: '成功',
            message: '价格更新成功',
            type: 'success'
          });
          this.initList()
          this.upPayment = false
        } else {
          this.$notify({
            title: '错误',
            message: '价格更新失败了',
          });
        }
        console.log('res.Data', res)
      })
    },
    upSidInfo() {
      this.formUpSid.remark = this.formUpSid.remark + "-" + this.formUpSid.sidType
      this.formUpSid.type = "3"
      this.formLabelAlign.sid = this.formUpSid.remark
      console.log("修改运单信息：", this.formLabelAlign)
      console.log("修改运单信息formUpSid：", this.formUpSid)
      fGMessageBatchUpdateStarAndRemark(this.formUpSid).then(res => {
        if (res.msg === "success") {
          this.$notify({
            title: '成功',
            message: '发货成功',
            type: 'success'
          });

          fGMessageUp(this.formLabelAlign).then(res => {
            if (res.msg === "success") {
              this.$notify({
                title: '成功',
                message: '更新成功',
                type: 'success'
              });
              this.upSid = false
              this.initList()
            }
            console.log('res.Data', res)
          })
        } else {
          this.$notify({
            title: '错误',
            message: '更新失败了',
          });
        }
        console.log('res.Data', res)
      })
    },
    // 核心排序方法
    triggerShopSort(order) {
      // 1. 触发表格内部状态变化（虽然看不见，但逻辑会走）
      this.$refs.tableData.sort('shop_name', order);

      // 2. 执行实际的数据排序
      this.tableData.sort((a, b) => {
        const res = a.shop_name.localeCompare(b.shop_name, 'zh-Hans-CN');
        return order === 'ascending' ? res : -res;
      });
    },
  }
}
</script>
