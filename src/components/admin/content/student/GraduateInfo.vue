<template>
  <div>
    <div>
      <el-row style="margin: -18px 0px 18px 18px ">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/admin/welcome' }">后台管理</el-breadcrumb-item>
          <el-breadcrumb-item>学生类管理</el-breadcrumb-item>
          <el-breadcrumb-item>毕业生信息</el-breadcrumb-item>
        </el-breadcrumb>
      </el-row>
      <div style="display: flex;justify-content: space-between">
        <div>
          <el-input placeholder="请输入姓名" prefix-icon="el-icon-search"
                    clearable
                    @clear="initStudents"
                    style="width: 130px;margin-right: 10px" v-model="keywordName"
                    @keydown.enter.native="initStudents" :disabled="showAdvanceSearchView"></el-input>
          <el-input placeholder="请输入学号，可回车搜索..." prefix-icon="el-icon-search"
                    clearable
                    @clear="initStudents"
                    style="width: 220px;margin-right: 10px" v-model="studentId"
                    @keydown.enter.native="initStudents" :disabled="showAdvanceSearchView"></el-input>
          <el-button icon="el-icon-search" type="primary" @click="initStudents" :disabled="showAdvanceSearchView">
            搜索
          </el-button>
          <el-button type="primary" @click="showAdvanceSearchView = !showAdvanceSearchView">
            <i :class="showAdvanceSearchView?'fa fa-angle-double-up':'fa fa-angle-double-down'"
               aria-hidden="true"></i>
            高级搜索
          </el-button>
        </div>
        <div>
          <el-upload
            ref="upload"
            action="void"
            multiple
            :multiple="false"
            style="display: inline-flex;margin-right: 8px"
            :http-request="customUpload"
            :on-remove="handleRemove"
            :on-progress="progressA"
            :auto-upload="true">
            <el-button :disabled="importDataDisabled" type="success" :icon="importDataBtnIcon">
              导入数据
            </el-button>
          </el-upload>
          <el-button :loading="downloadLoading" type="success" @click="exportData" icon="el-icon-download">
            导出数据
          </el-button>
          <el-button type="primary" icon="el-icon-plus" @click="showAddEmpView">
            添加学生
          </el-button>
        </div>
      </div>
      <transition name="slide-fade">
        <div v-show="showAdvanceSearchView"
             style="border: 1px solid #409eff;border-radius: 5px;box-sizing: border-box;padding: 5px;margin: 10px 0px;">
          <el-row>
            <el-col :span="5">
              所属院系:
              <el-select v-model="searchValue.departmentId" placeholder="所属院系" size="mini" clearable="clearable"
                         @change="changeDepartment" style="width: 130px;">
                <el-option
                  v-for="item in department"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="5">
              专业:
              <el-select v-model="searchValue.specialtyId" placeholder="专业" size="mini" clearable="clearable"
                         style="width: 130px;">
                <el-option
                  v-for="item in specialtySelected"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="5">
              学生职位:
              <el-select v-model="searchValue.positionId" placeholder="学生职位" size="mini" clearable="clearable"
                         style="width: 130px;">
                <el-option
                  v-for="item in position"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="5">
              政治面貌:
              <el-select v-model="searchValue.politicId" placeholder="政治面貌" size="mini" clearable="clearable"
                         style="width: 130px;">
                <el-option
                  v-for="item in politics"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="4">
              民族:
              <el-select v-model="searchValue.nationId" placeholder="民族" size="mini" clearable="clearable"
                         style="width: 130px;">
                <el-option
                  v-for="item in nations"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row style="margin-top: 10px">
            <el-col :span="10">
              入学日期:
              <el-date-picker
                v-model="searchValue.beginDateScope"
                type="daterange"
                size="mini"
                unlink-panels
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions">
              </el-date-picker>
            </el-col>
            <el-col :span="5" :offset="4">
              <el-button size="mini" @click="showAdvanceSearchView=false">取消</el-button>
              <el-button size="mini" icon="el-icon-search" type="primary" @click="initStudents">搜索
              </el-button>
            </el-col>
          </el-row>
        </div>
      </transition>
    </div>
    <div style="margin-top: 10px">
      <el-table
        :data="students"
        stripe
        border
        highlight-current-row="highlight-current-row"
        v-loading="loading"
        element-loading-text="正在加载..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="RGB(239,239,239)"
        style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="name"
          fixed
          align="left"
          label="姓名"
          width="120">
        </el-table-column>
        <el-table-column
          prop="studentId"
          label="学号"
          sortable
          width="120">
        </el-table-column>
        <el-table-column
          prop="gender"
          label="性别"
          sortable
          width="85">
        </el-table-column>
        <el-table-column
          prop="birthday"
          width="110"
          sortable
          label="出生日期">
        </el-table-column>
        <el-table-column
          prop="idCard"
          width="170"
          sortable
          label="身份证号码">
        </el-table-column>
        <el-table-column
          prop="nation.name"
          width="90"
          sortable
          label="民族">
        </el-table-column>
        <el-table-column
          prop="nativePlace"
          width="90"
          sortable
          label="籍贯">
        </el-table-column>
        <el-table-column
          prop="politics.name"
          width="110"
          sortable
          label="政治面貌">
        </el-table-column>
        <el-table-column
          prop="email"
          width="170"
          align="left"
          sortable
          label="电子邮件">
        </el-table-column>
        <el-table-column
          prop="phone"
          width="110"
          sortable
          label="电话号码">
        </el-table-column>
        <el-table-column
          prop="address"
          width="220"
          sortable
          label="联系地址">
        </el-table-column>
        <el-table-column
          prop="topDegree"
          width="120"
          sortable
          label="最高学历">
        </el-table-column>
        <el-table-column
          prop="school"
          width="160"
          sortable
          label="毕业院校">
        </el-table-column>
        <el-table-column
          prop="department.name"
          width="200"
          sortable
          label="所属院系">
        </el-table-column>
        <el-table-column
          prop="specialty.name"
          width="200"
          sortable
          label="专业">
        </el-table-column>
        <el-table-column
          prop="position.name"
          width="120"
          sortable
          label="学生职位">
        </el-table-column>
        <el-table-column
          prop="languageLevel"
          width="150"
          sortable
          label="外语水平">
        </el-table-column>
        <el-table-column
          prop="computerLevel"
          width="150"
          sortable
          label="计算机等级">
        </el-table-column>
        <el-table-column
          prop="beginDate"
          width="120"
          sortable
          label="入学日期">
        </el-table-column>
        <el-table-column
          prop="endDate"
          width="120"
          sortable
          label="毕业日期">
        </el-table-column>
        <el-table-column
          fixed="right"
          width="200"
          label="操作">
          <template slot-scope="scope">
            <el-button @click="showEditStudentView(scope.row)" style="padding: 3px" size="mini">编辑</el-button>
            <el-button @click="deleteStudent(scope.row,scope.$index)" style="padding: 3px" size="mini" type="danger">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
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
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="80%">
      <div>
        <el-form :model="student" :rules="rules" ref="stuForm">
          <el-row>
            <el-col :span="6">
              <el-form-item label="姓名:" prop="name">
                <el-input size="mini" style="width: 150px" prefix-icon="el-icon-edit" v-model="student.name"
                          placeholder="请输入学生姓名"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="性别:" prop="gender">
                <el-radio-group v-model="student.gender">
                  <el-radio label="男">男</el-radio>
                  <el-radio label="女">女</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="出生日期:" prop="birthday">
                <el-date-picker
                  v-model="student.birthday"
                  size="mini"
                  type="date"
                  value-format="yyyy-MM-dd"
                  style="width: 150px;"
                  placeholder="出生日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="政治面貌:" prop="politicId">
                <el-select v-model="student.politicId" placeholder="政治面貌" size="mini" style="width: 200px;">
                  <el-option
                    v-for="item in politics"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="民族:" prop="nationId">
                <el-select v-model="student.nationId" placeholder="民族" size="mini" style="width: 150px;">
                  <el-option
                    v-for="item in nations"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="籍贯:" prop="nativePlace">
                <el-input size="mini" style="width: 120px" prefix-icon="el-icon-edit"
                          v-model="student.nativePlace" placeholder="请输入籍贯"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="电子邮箱:" prop="email">
                <el-input size="mini" style="width: 150px" prefix-icon="el-icon-message"
                          v-model="student.email" placeholder="请输入电子邮箱"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="联系地址:" prop="address">
                <el-input size="mini" style="width: 200px" prefix-icon="el-icon-edit"
                          v-model="student.address" placeholder="请输入联系地址"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="身份证号码:" prop="idCard">
                <el-input size="mini" style="width: 180px" prefix-icon="el-icon-edit"
                          v-model="student.idCard" placeholder="请输入身份证号码"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="电话号码:" prop="phone">
                <el-input size="mini" style="width: 200px" prefix-icon="el-icon-phone"
                          v-model="student.phone" placeholder="电话号码"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="学号:" prop="studentId">
                <el-input size="mini" style="width: 150px" prefix-icon="el-icon-edit"
                          v-model="student.studentId" placeholder="学号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="学历:" prop="topDegree">
                <el-select v-model="student.topDegree" placeholder="学历" size="mini"
                           style="width: 150px;">
                  <el-option
                    v-for="item in topDegrees"
                    :key="item"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="毕业院校:" prop="school">
                <el-input size="mini" style="width: 150px" prefix-icon="el-icon-edit"
                          v-model="student.school" placeholder="毕业院校名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="所属院系:" prop="departmentId">
                <el-select v-model="student.departmentId" placeholder="院系" size="mini"
                           @change="changeDepartment" style="width: 150px;">
                  <el-option
                    v-for="item in department"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="专业:" prop="departmentId">
                <el-select v-model="student.specialtyId" placeholder="专业" size="mini"
                           style="width: 150px;">
                  <el-option
                    v-for="item in specialtySelected"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="学生职位:" prop="positionId">
                <el-select v-model="student.positionId" placeholder="学生职位" size="mini"
                           style="width: 150px;">
                  <el-option
                    v-for="item in position"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="外语水平:" prop="languageLevel">
                <el-input size="mini" style="width: 180px" prefix-icon="el-icon-edit"
                          v-model="student.languageLevel" placeholder="请输入外语水平"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="计算机水平:" prop="computerLevel">
                <el-input size="mini" style="width: 180px" prefix-icon="el-icon-edit"
                          v-model="student.computerLevel" placeholder="请输入计算机水平"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="入学日期:" prop="beginDate">
                <el-date-picker
                  v-model="student.beginDate"
                  size="mini"
                  type="date"
                  value-format="yyyy-MM-dd"
                  style="width: 130px;"
                  placeholder="入学日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="毕业日期:" prop="endDate">
                <el-date-picker
                  v-model="student.endDate"
                  size="mini"
                  type="date"
                  value-format="yyyy-MM-dd"
                  style="width: 130px;"
                  placeholder="毕业日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="doAddStudent">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "GraduateInfo",
    data() {
      return {
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
        searchValue: {
          departmentId: null,
          specialtyId: null,
          positionId: null,
          politicId: null,
          nationId: null,
          languageLevel: null,
          computerLevel: null,
          beginDateScope: null
        },
        baseUrl: this.$axios.defaults.baseURL,
        title: '',
        importDataBtnIcon: 'el-icon-upload2',
        importDataDisabled: false,
        downloadLoading: false,
        showAdvanceSearchView: false,
        students: [],
        loading: false,
        dialogVisible: false,
        total: 0,
        page: 1,
        keywordName: '',
        studentId: '',
        size: 10,
        nations: [],
        department: [],
        specialty: [],
        specialtySelected: [],
        position: [],
        politics: [],
        topDegrees: ['本科', '大专', '硕士', '博士', '高中', '初中', '小学', '其他'],
        student: {
          name: "",
          studentId: "",
          gender: "",
          birthday: "",
          idCard: "",
          nationId: "",
          nativePlace: "",
          politicId: "",
          email: "",
          phone: "",
          address: "",
          school: "",
          topDegree: "",
          departmentId: "",
          specialtyId: "",
          positionId: "",
          beginDate: "",
          endDate: ""
        },
        rules: {
          name: [{required: true, message: '请输入用户名', trigger: 'blur'}],
          gender: [{required: true, message: '请输入性别', trigger: 'blur'}],
          birthday: [{required: true, message: '请输入出生日期', trigger: 'blur'}],
          idCard: [{required: true, message: '请输入身份证号码', trigger: 'blur'}, {
            pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
            message: '身份证号码格式不正确',
            trigger: 'blur'
          }],
          nationId: [{required: true, message: '请输入您组', trigger: 'blur'}],
          nativePlace: [{required: true, message: '请输入籍贯', trigger: 'blur'}],
          politicId: [{required: true, message: '请输入政治面貌', trigger: 'blur'}],
          email: [{required: true, message: '请输入邮箱地址', trigger: 'blur'}, {
            type: 'email',
            message: '邮箱格式不正确',
            trigger: 'blur'
          }],
          phone: [{required: true, message: '请输入电话号码', trigger: 'blur'}],
          address: [{required: true, message: '请输入学生地址', trigger: 'blur'}],
          departmentId: [{required: true, message: '请输入院系名称', trigger: 'blur'}],
          topDegree: [{required: true, message: '请输入学历', trigger: 'blur'}],
          specialty: [{required: true, message: '请输入专业', trigger: 'blur'}],
          school: [{required: true, message: '请输入毕业院校', trigger: 'blur'}],
          beginDate: [{required: true, message: '请输入入学日期', trigger: 'blur'}],
          studentId: [{required: true, message: '请输入学号', trigger: 'blur'}],
        }
      }
    },
    mounted() {
      this.initStudents();
      this.initData();
    },
    methods: {
      customUpload(file) {
        let FormDatas = new FormData();
        FormDatas.append('file', file.file);
        this.$axios({
          url: this.baseUrl + "/content/student/import",
          method: 'post',
          data: FormDatas,
          //上传进度
          onUploadProgress: (progressEvent) => {
            let num = progressEvent.loaded / progressEvent.total * 100 | 0;  //百分比
            file.onProgress({percent: num})     //进度条
          }
        }).then(resp => {
          if (resp.data.code === 200) {
            file.onSuccess(); //上传成功(打钩的小图标)
            this.$message({type: 'success', message: '导入完成'})
          }
        })
      },
      /**     文件正在上传时的钩子    **/
      progressA(event, file) {
      },
      /**     移除上传文件    **/
      handleRemove(file) {
        this.$refs.upload.abort(); //取消上传
        this.$message({message: '成功移除' + file.name, type: 'success'});
      },
      exportData() {
        this.downloadLoading = true
        this.$axios.get("/content/student/loading").then(resp => {
          if (resp.data.code === 200) {
            this.downloadLoading = false
            this.$message({type: 'success', message: '下载完成'})
          }
        })
        // 文件传输不能用ajax
        window.open(this.baseUrl + "/content/student/export", "_parent")
      },
      emptyEmp() {
        this.student = {
          name: "",
          studentId: "",
          gender: "",
          birthday: "",
          idCard: "",
          nationId: "",
          nativePlace: "",
          politicId: "",
          email: "",
          phone: "",
          address: "",
          school: "",
          topDegree: "",
          departmentId: "",
          specialtyId: "",
          positionId: "",
          beginDate: "",
          endDate: ""
        }
      },
      showEditStudentView(data) {
        this.title = '编辑学生信息';
        this.student = data;
        this.dialogVisible = true;
      },
      deleteStudent(data, index) {
        this.$confirm('此操作将永久删除【' + data.name + '】, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.delete("/content/student?studentId=" + data.id).then(resp => {
            if (resp.data.code === 200) {
              this.students.splice(index, 1)
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      doAddStudent() {
        if (this.student.id) {
          this.$refs['stuForm'].validate(valid => {
            if (valid) {
              this.$axios.put("/content/student", this.student).then(resp => {
                if (resp.data.code === 200) {
                  this.dialogVisible = false;
                  this.initStudents();
                }
              })
            }
          });
        } else {
          this.$refs['stuForm'].validate(valid => {
            if (valid) {
              this.$axios.post("/content/student", this.student).then(resp => {
                if (resp.data.code === 200) {
                  this.dialogVisible = false;
                  this.initStudents();
                }
              })
            }
          });
        }
      },
      changeDepartment(departmentId) {
        let selectedSpecialty = []
        this.specialty.forEach((spelty) => {
          if (spelty.departmentId == departmentId) {
            selectedSpecialty.push(spelty)
          }
        })
        this.specialtySelected = selectedSpecialty
      },
      initData() {
        if (!window.sessionStorage.getItem("department")) {
          this.$axios.get('/content/department').then(resp => {
            if (resp.data.code === 200) {
              this.department = resp.data.data;
              window.sessionStorage.setItem("department", JSON.stringify(this.department));
            }
          })
        } else {
          this.department = JSON.parse(window.sessionStorage.getItem("department"));
        }
        if (!window.sessionStorage.getItem("specialty")) {
          this.$axios.get('/content/specialty').then(resp => {
            if (resp.data.code === 200) {
              this.specialty = resp.data.data;
              window.sessionStorage.setItem("specialty", JSON.stringify(this.specialty));
            }
          })
        } else {
          this.specialty = JSON.parse(window.sessionStorage.getItem("specialty"));
        }
        this.specialtySelected = this.specialty
        if (!window.sessionStorage.getItem("position")) {
          this.$axios.get('/content/position').then(resp => {
            if (resp.data.code === 200) {
              this.position = resp.data.data;
              window.sessionStorage.setItem("position", JSON.stringify(this.position));
            }
          })
        } else {
          this.position = JSON.parse(window.sessionStorage.getItem("position"));
        }
        if (!window.sessionStorage.getItem("nations")) {
          this.$axios.get('/content/nations').then(resp => {
            if (resp.data.code === 200) {
              this.nations = resp.data.data;
              window.sessionStorage.setItem("nations", JSON.stringify(this.nations));
            }
          })
        } else {
          this.nations = JSON.parse(window.sessionStorage.getItem("nations"));
        }
        if (!window.sessionStorage.getItem("politics")) {
          this.$axios.get('/content/politics').then(resp => {
            if (resp.data.code === 200) {
              this.politics = resp.data.data;
              window.sessionStorage.setItem("politics", JSON.stringify(this.politics));
            }
          })
        } else {
          this.politics = JSON.parse(window.sessionStorage.getItem("politics"));
        }
      },
      sizeChange(currentSize) {
        this.size = currentSize;
        this.initStudents();
      },
      currentChange(currentPage) {
        this.page = currentPage;
        this.initStudents();
      },
      showAddEmpView() {
        this.emptyEmp();
        this.title = '添加学生';
        this.dialogVisible = true;
      },
      initStudents(type) {
        this.loading = true;
        let url = '/content/student?page=' + this.page + '&size=' + this.size;
        if (this.searchValue.departmentId) {
          url += '&departmentId=' + this.searchValue.departmentId;
        }
        if (this.searchValue.specialtyId) {
          url += '&specialtyId=' + this.searchValue.specialtyId;
        }
        if (this.searchValue.positionId) {
          url += '&positionId=' + this.searchValue.positionId;
        }
        if (this.searchValue.politicId) {
          url += '&politicId=' + this.searchValue.politicId;
        }
        if (this.searchValue.nationId) {
          url += '&nationId=' + this.searchValue.nationId;
        }
        if (this.searchValue.beginDateScope) {
          url += '&beginDateScope=' + this.searchValue.beginDateScope;
        }
        if (this.keywordName) {
          url += "&name=" + this.keywordName;
        }
        if (this.studentId) {
          url += "&studentId=" + this.studentId;
        }
        this.$axios.get(url).then(resp => {
          if (resp.data.code === 200) {
            this.students = resp.data.data.data;
            this.total = resp.data.data.total;
            this.loading = false
          }
        })
      }
    }
  }
</script>

<style>
  /* 可以设置不同的进入和离开动画 */
  /* 设置持续时间和动画函数 */
  .slide-fade-enter-active {
    transition: all .3s ease;
  }

  .slide-fade-leave-active {
    transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  {
    transform: translateX(10px)
  ;
    opacity: 0
  ;
  }
</style>
