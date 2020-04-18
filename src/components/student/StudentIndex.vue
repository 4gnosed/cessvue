<template>
  <div style="height: 1500px">
    <div style="margin-top: 20px">
      <div>
        <el-input placeholder="搜索职位、公司、关键词 " prefix-icon="el-icon-search"
                  clearable
                  @clear="initPositions"
                  style="width: 400px;margin-right: 10px" v-model="this.searchValue.keywords"
                  @keydown.enter.native="initStudents" :disabled="showAdvanceSearchView"></el-input>
        <el-button icon="el-icon-search" type="primary" @click="initPositions" :disabled="showAdvanceSearchView">
          搜索
        </el-button>
        <el-button type="primary" @click="showAdvanceSearchView = !showAdvanceSearchView">
          <i :class="showAdvanceSearchView?'fa fa-angle-double-up':'fa fa-angle-double-down'"
             aria-hidden="true"></i>
          高级搜索
        </el-button>
      </div>
      <!--      <transition name="slide-fade">-->
      <!--        <div v-show="showAdvanceSearchView"-->
      <!--             style="border: 1px solid #409eff;border-radius: 5px;box-sizing: border-box;padding: 5px;margin: 10px 0px;">-->
      <!--          <el-row>-->
      <!--            <el-col :span="5">-->
      <!--              所属院系:-->
      <!--              <el-select v-model="searchValue.departmentId" placeholder="所属院系" size="mini" clearable="clearable"-->
      <!--                         @change="changeDepartment" style="width: 130px;">-->
      <!--                <el-option-->
      <!--                  v-for="item in department"-->
      <!--                  :key="item.id"-->
      <!--                  :label="item.name"-->
      <!--                  :value="item.id">-->
      <!--                </el-option>-->
      <!--              </el-select>-->
      <!--            </el-col>-->
      <!--            <el-col :span="5">-->
      <!--              专业:-->
      <!--              <el-select v-model="searchValue.specialtyId" placeholder="专业" size="mini" clearable="clearable"-->
      <!--                         style="width: 130px;">-->
      <!--                <el-option-->
      <!--                  v-for="item in specialtySelected"-->
      <!--                  :key="item.id"-->
      <!--                  :label="item.name"-->
      <!--                  :value="item.id">-->
      <!--                </el-option>-->
      <!--              </el-select>-->
      <!--            </el-col>-->
      <!--            <el-col :span="5">-->
      <!--              学生职位:-->
      <!--              <el-select v-model="searchValue.positionId" placeholder="学生职位" size="mini" clearable="clearable"-->
      <!--                         style="width: 130px;">-->
      <!--                <el-option-->
      <!--                  v-for="item in position"-->
      <!--                  :key="item.id"-->
      <!--                  :label="item.name"-->
      <!--                  :value="item.id">-->
      <!--                </el-option>-->
      <!--              </el-select>-->
      <!--            </el-col>-->
      <!--            <el-col :span="5">-->
      <!--              政治面貌:-->
      <!--              <el-select v-model="searchValue.politicId" placeholder="政治面貌" size="mini" clearable="clearable"-->
      <!--                         style="width: 130px;">-->
      <!--                <el-option-->
      <!--                  v-for="item in politics"-->
      <!--                  :key="item.id"-->
      <!--                  :label="item.name"-->
      <!--                  :value="item.id">-->
      <!--                </el-option>-->
      <!--              </el-select>-->
      <!--            </el-col>-->
      <!--            <el-col :span="4">-->
      <!--              民族:-->
      <!--              <el-select v-model="searchValue.nationId" placeholder="民族" size="mini" clearable="clearable"-->
      <!--                         style="width: 130px;">-->
      <!--                <el-option-->
      <!--                  v-for="item in nations"-->
      <!--                  :key="item.id"-->
      <!--                  :label="item.name"-->
      <!--                  :value="item.id">-->
      <!--                </el-option>-->
      <!--              </el-select>-->
      <!--            </el-col>-->
      <!--          </el-row>-->
      <!--          <el-row style="margin-top: 10px">-->
      <!--            <el-col :span="10">-->
      <!--              入学日期:-->
      <!--              <el-date-picker-->
      <!--                v-model="searchValue.beginDateScope"-->
      <!--                type="daterange"-->
      <!--                size="mini"-->
      <!--                unlink-panels-->
      <!--                value-format="yyyy-MM-dd"-->
      <!--                range-separator="至"-->
      <!--                start-placeholder="开始日期"-->
      <!--                end-placeholder="结束日期"-->
      <!--                :picker-options="pickerOptions">-->
      <!--              </el-date-picker>-->
      <!--            </el-col>-->
      <!--            <el-col :span="5" :offset="4">-->
      <!--              <el-button size="mini" @click="showAdvanceSearchView=false">取消</el-button>-->
      <!--              <el-button size="mini" icon="el-icon-search" type="primary" @click="initStudents">搜索-->
      <!--              </el-button>-->
      <!--            </el-col>-->
      <!--          </el-row>-->
      <!--        </div>-->
      <!--      </transition>-->
      <div class="position_card">
        <el-card shadow="hover" v-for="(position,index) in positions" :key="position.id" class="position_item">
          <el-collapse accordion>
            <el-collapse-item>
              <template slot="title">
                <div style="float: left;width: 600px;font-size: 16px">
                  <div style="float: left;margin-left: 10px">{{position.name}}</div>
                  <div style="float: left;margin-left: 10px">[{{position.address}}]</div>
                </div>
                <div style="float: right;width: 400px;font-size: 16px">
                  <template v-for="enterprise in enterprises" v-if="enterprise.id === position.enterpriseId">
                    <div>
                      {{enterprise.name}}
                    </div>
                  </template>
                </div>
              </template>
            </el-collapse-item>
          </el-collapse>
          <div style="margin-top: 20px;text-align: left;font-size: 14px">
            &nbsp;&nbsp;&nbsp;{{position.keyword}}
          </div>
        </el-card>
        <div style="display: flex;justify-content: flex-end">
          <el-pagination
            background
            @current-change="currentChange"
            @size-change="sizeChange"
            layout="sizes, prev, pager, next, jumper, ->, total, slot"
            :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "student",
    data() {
      return {
        showAdvanceSearchView: false,
        searchValue: {
          keywords: '',
        },
        position: {
          userId: '',
          enterpriseId: '',
          id: '',
          name: '',
          address: '',
          salaryId: '',
          degreeId: '',
          experienceId: '',
          description: '',
          natureId: '',
          number: '',
          keyword: '',
          updateTime: ''
        },
        salaries: [],
        degrees: [],
        experiences: [],
        natures: [],
        positions: [],
        enterprises: [],
        total: 0,
        page: 1,
        size: 10,
      }
    },
    mounted() {
      this.initData()
      this.initPositions()
    },
    methods: {
      initData() {
        if (!window.sessionStorage.getItem("salaries")) {
          this.$axios.get('/salary').then(resp => {
            if (resp.data.code === 200) {
              this.salaries = resp.data.data;
              window.sessionStorage.setItem("salaries", JSON.stringify(this.salaries));
            }
          })
        } else {
          this.salaries = JSON.parse(window.sessionStorage.getItem("salaries"));
        }
        if (!window.sessionStorage.getItem("degrees")) {
          this.$axios.get('/degree').then(resp => {
            if (resp.data.code === 200) {
              this.degrees = resp.data.data;
              window.sessionStorage.setItem("degrees", JSON.stringify(this.degrees));
            }
          })
        } else {
          this.degrees = JSON.parse(window.sessionStorage.getItem("degrees"));
        }
        if (!window.sessionStorage.getItem("experiences")) {
          this.$axios.get('/experience').then(resp => {
            if (resp.data.code === 200) {
              this.experiences = resp.data.data;
              window.sessionStorage.setItem("experiences", JSON.stringify(this.experiences));
            }
          })
        } else {
          this.experiences = JSON.parse(window.sessionStorage.getItem("experiences"));
        }
        if (!window.sessionStorage.getItem("natures")) {
          this.$axios.get('/nature').then(resp => {
            if (resp.data.code === 200) {
              this.natures = resp.data.data;
              window.sessionStorage.setItem("natures", JSON.stringify(this.natures));
            }
          })
        } else {
          this.natures = JSON.parse(window.sessionStorage.getItem("natures"));
        }
        if (!window.sessionStorage.getItem("enterprises")) {
          this.$axios.get('/enterprise').then(resp => {
            if (resp.data.code === 200) {
              this.enterprises = resp.data.data;
              window.sessionStorage.setItem("enterprises", JSON.stringify(this.enterprises));
            }
          })
        } else {
          this.enterprises = JSON.parse(window.sessionStorage.getItem("enterprises"));
        }
      },
      initPositions() {
        let url = '/positions?page=' + this.page + '&size=' + this.size;
        if (this.searchValue.keywords) {
          url += '&keywords=' + this.searchValue.keywords;
        }
        this.$axios.get(url).then(resp => {
          if (resp.data.code === 200) {
            this.positions = resp.data.data.data;
            this.total = resp.data.data.total;
          }
        })
      },
      sizeChange(currentSize) {
        this.size = currentSize;
        this.initPositions();
      },
      currentChange(currentPage) {
        this.page = currentPage;
        this.initPositions();
      },
    }
  }
</script>

<style scoped>
  .position_card {
    margin: auto;
    margin-top: 30px;
    text-align: center;
    width: 1200px;
  }

  .position_item {
    margin-top: 20px;
    margin-bottom: 10px;
  }
</style>
