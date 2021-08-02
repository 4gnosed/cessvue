<template>
  <div>
    <el-container style="text-align: center;">
      <el-header style="height: 150px;">
        <el-form ref="refForm" :model="good" :label-position="labelPosition">
          <el-row>
            <el-col :span="6" style="height: 150px;">
              <el-form-item label="商品ID" prop="goodId">
                <el-input v-model.number="good.goodId" size="mini" style="width: 200px;"></el-input>
              </el-form-item>
              <el-form-item label="商品库存" prop="stock">
                <el-input v-model.number="good.stock" size="mini" style="width: 200px;"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="otherGood()" size="mini" style="width: 100px;">换个商品</el-button>
              </el-form-item>
            </el-col>
            <el-col :span="6" style="height: 150px;">
              <el-form ref="refForm" :model="good" :label-position="labelPosition">
                <el-form-item label="商品名称" prop="goodName">
                  <el-input v-model.number="good.goodName" size="mini" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item label="商品单价" prop="price">
                  <el-input v-model.number="good.price" size="mini" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item label="是否监听数据" style="text-align: left;">
                  <el-switch v-model="watchV" active-color="#67C23A" @change="watchVChange"></el-switch>
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :span="6" class="col-style">
              <div style="height: 20%;">商品库存数</div>
              <div style="height: 80%;font-size: 80px;font-weight: bold;">{{stock}}</div>
            </el-col>
            <el-col :span="6" class="col-style">
              <div style="height: 20%;">库存占比</div>
              <div id="echarts" style="width: 100%; height: 80%;"></div>
            </el-col>
          </el-row>
        </el-form>
      </el-header>
      <el-divider></el-divider>
      <el-alert type="success" effect="dark" center>
        <el-tooltip class="item" effect="dark" :content="'购买链接：'+buyUrl+'，请使用jmeter等工具并发访问'" placement="top">
          <el-button size="mini" @click="buyOne()">购买一个</el-button>
        </el-tooltip>
      </el-alert>
      <el-divider></el-divider>
      <el-main>
        <el-table :data="tableData">
          <el-table-column label="订单号" prop="id">
          </el-table-column>
          <el-table-column label="商品号" prop="goodId">
          </el-table-column>
          <el-table-column label="用户" prop="userId">
          </el-table-column>
          <el-table-column label="购买数量" prop="quantity">
          </el-table-column>
          <el-table-column label="下单时间" prop="createTime">
          </el-table-column>
          <el-table-column label="状态" prop="status">
            <template slot-scope="scope">
              {{
            		scope.row.status == 0? '失败': scope.row.status == 1? '成功': '-'
            	}}
            </template>
          </el-table-column>
          <el-table-column align="right">
            <template slot="header" slot-scope="scope">
              <span>更新间隔时间(s)</span>
              <el-select v-model="seconds" size="mini">
                <el-option label="1" value="1"></el-option>
                <el-option label="2" value="2"></el-option>
                <el-option label="3" value="3"></el-option>
                <el-option label="4" value="4"></el-option>
                <el-option label="5" value="5"></el-option>
              </el-select>
            </template>
            <!--            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
            </template> -->
          </el-table-column>
        </el-table>
        <el-pagination background class="custom-paging" :current-page.sync="pages.page" :page-sizes="[10, 20, 30, 40, 50]"
          @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-size.sync="pages.size" layout="total, sizes, prev, pager, next, jumper"
          :total="pages.total" :hide-on-single-page="false">
        </el-pagination>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import 'echarts-liquidfill/src/liquidFill.js' // 在这里引入
import echarts from 'echarts'

export default {
  name: 'seckill',
  data () {
    return {
      buyUrl: '',
      dateTime: '',
      watchV: false,
      seconds: 1,
      stock: 0,
      stockPercentage: 0,
      good: {
        goodId: '1',
        goodName: 'A级芒果',
        stock: 100,
        price: 23
      },
      labelPosition: 'left',
      pages: {
        // 分页
        page: 1, // 当前页
        size: 10, // 每页大小
        total: 0 // 总页数
      },
      tableData: []
    }
  },
  mounted () {
    this.good.goodId = this.genID(10)
    this.echartsMit()
    this.buyUrl = 'http://120.77.32.19/cess/api/seckill/good/buy?goodId=' + this.good.goodId + '&quantity=1&userId=1'
    this.saveGood()
  },
  methods: {
    // 绘制指标图
    echartsMit () {
      var dom = document.getElementById('echarts')
      var myChart = echarts.init(dom)
      let option = {
        series: [{
          type: 'liquidFill',
          radius: '90%',
          waveAnimation: true,
          data: [{
            value: this.stockPercentage,
            direction: 'left',
            itemStyle: {
              normal: {
                // 这里就是根据不同的值显示不同球体的颜色
                color: eval(
                  "if(this.stockPercentage<0.3){'rgba(248, 9, 65, 1)'}else if(this.stockPercentage<0.7){'rgba(250, 173, 20, 1)'}else{'rgba(0, 159, 232, 1)'}"
                )
              }
            }
          }],
          outline: {
            //   show: true, //是否显示轮廓 布尔值
            borderDistance: 1, // 外部轮廓与图表的距离 数字
            itemStyle: {
              // 这里就是根据不同的值显示不同边框的颜色
              borderColor: eval(
                "if(this.stockPercentage<0.3){'rgba(248, 9, 65, 1)'}else if(this.stockPercentage<0.7){'rgba(250, 173, 20, 1)'}else{'rgba(0, 159, 232, 1)'}"
              ), // 边框的颜色
              borderWidth: 3 // 边框的宽度
              // shadowBlur: 5 , //外部轮廓的阴影范围 一旦设置了内外都有阴影
              // shadowColor: '#000' //外部轮廓的阴影颜色
            }
          },
          itemStyle: {
            opacity: 0.9, // 波浪的透明度
            shadowBlur: 0 // 波浪的阴影范围
          },
          backgroundStyle: {
            color: '#fff' // 图表的背景颜色
          },
          label: {
            // 数据展示样式
            show: true,
            color: '#000',
            insideColor: '#fff',
            fontSize: 20,
            fontWeight: 400,
            align: 'center',
            baseline: 'middle',
            position: 'inside'
          }
        }]
      }
      myChart.setOption(option)
    },
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    },
    saveGood () {
      this.$axios
        .post('/seckill/good', this.good)
        .then(resp => {
          if (resp.data.code !== 200) {
            this.$notify({
              message: resp.data.message,
              type: 'error'
            })
          }
        })
    },
    otherGood () {
      this.good.goodId = this.genID(10)
      this.buyUrl = 'http://120.77.32.19/cess/api/seckill/good/buy?goodId=' + this.good.goodId +
          '&quantity=1&userId=1'
      this.saveGood()
    },
    watchOrder () {
      let this_ = this
      clearInterval(this_.dateTime)
      this.dateTime = setInterval(function () {
        this_.$axios.get('/seckill/order?size=' + this_.pages.size + '&page=' + this_.pages.page +
              '&goodId=' + this_.good.goodId)
          .then(resp => {
            if (resp.data.code === 200) {
              if (resp.data.data !== null) {
                this_.tableData = resp.data.data.dataList
                this_.pages.total = resp.data.data.total
                this_.stock = resp.data.data.stock
                this_.stockPercentage = resp.data.data.stockPercentage
              }
            } else {
              clearInterval(this_.dateTime)
            }
          }).catch(error => {
            clearInterval(this_.dateTime)
          })
      }, this_.seconds * 1000)
    },
    genID (length) {
      return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36)
    },
    watchVChange (val) {
      console.log(val)
      if (val === true) {
        this.watchOrder()
        this.$notify({
          message: '开始监听',
          type: 'success'
        })
      } else {
        clearInterval(this.dateTime)
        this.$notify({
          message: '停止监听',
          type: 'warn'
        })
      }
    },
    buyOne () {
      this.$axios.get(this.buyUrl)
        .then(resp => {
          if (resp.data.code === 200) {
            this.$notify({
              message: '购买成功',
              type: 'success'
            })
          } else {
            this.$notify({
              message: '购买失败',
              type: 'warn'
            })
          }
        }).catch(error => {
          this.$notify({
            message: '购买失败',
            type: 'warn'
          })
        })
    },
    // 分页
    handleSizeChange (val) {
      this.pages.size = val
      this.justSearch()
    },
    handleCurrentChange (val) {
      this.pages.page = val
      this.justSearch()
    },
    justSearch () {
      let this_ = this
      this_.$axios.get('/seckill/order?size=' + this_.pages.size + '&page=' + this_.pages.page +
            '&goodId=' + this_.good.goodId)
        .then(resp => {
          if (resp.data.code === 200) {
            if (resp.data.data !== null) {
              this_.tableData = resp.data.data.dataList
              this_.pages.total = resp.data.data.total
            }
          }
        })
    }

  },

  watch: {
    stockPercentage (val, oldVal) {
      this.stockPercentage = val
      setTimeout(() => {
        this.echartsMit()
      })
    },
    seconds (val, oldVal) {
      clearInterval(this.dateTime)
      this.watchOrder()
    }
  }
}
</script>

<style scoped>
  .col-style {
    height: 150px;
    border-left: 1px solid #d9d9d9;
  }
</style>
