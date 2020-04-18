<template>
  <div style="height: 1500px">
    <div style="margin-top: 20px">
      <div>
        <el-input placeholder="搜索职位、公司、关键词 " prefix-icon="el-icon-search"
                  clearable
                  @clear="initPositions"
                  style="width: 400px;margin-right: 10px" v-model="keywordName"
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
    </div>
  </div>
</template>

<script>
  export default {
    name: "student",
    data() {
      return{
        showAdvanceSearchView: false,
        keywordName: '',
        searchValue: {

        },
      }
    },
    mounted() {
    },
    methods: {
      initPositions(){

      }
    }
  }
</script>

<style scoped>

</style>
