<template>
  <el-form :model="position" :rules="rules" ref="posForm" style="margin-left: 20px">
    <el-row>
      <el-col :span="6">
        <el-form-item label="职位名称:" prop="name">
          <el-input class="common_font_size" size="mini" style="width: 150px" prefix-icon="el-icon-edit"
                    v-model="position.name"
                    placeholder="请输入职位名称"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="招聘人数:" prop="number">
          <el-input class="common_font_size" size="mini" style="width: 100px" prefix-icon="el-icon-edit"
                    v-model="position.number"
                    placeholder="请输入招聘人数"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="工作地址:" prop="address">
          <el-input class="common_font_size" size="mini" style="width: 500px" prefix-icon="el-icon-edit"
                    v-model="position.address"
                    placeholder="请输入工作地址"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <el-form-item label="月薪范围:" prop="salaryId">
          <el-select v-model="position.salaryId" placeholder="请选择月薪" size="mini" style="width: 150px;">
            <el-option
              v-for="item in salaries"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="学历要求:" prop="degreeId">
          <el-select v-model="position.degreeId" placeholder="请选择学历" size="mini" style="width: 150px;">
            <el-option
              v-for="item in degrees"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="经验要求:" prop="experienceId">
          <el-select v-model="position.experienceId" placeholder="请选择经验要求" size="mini" style="width: 150px;">
            <el-option
              v-for="item in experiences"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="工作性质:" prop="natureId">
          <el-select v-model="position.natureId" placeholder="请选择工作性质" size="mini" style="width: 150px;">
            <el-option
              v-for="item in natures"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-form-item label="职位描述:" prop="description">
        <el-input type="textarea" :rows="14" class="common_font_size" size="mini" style="width: 1000px;"
                  prefix-icon="el-icon-edit"
                  show-word-limit v-model="position.description" placeholder="请输入职位描述"
                  maxlength="800"></el-input>
      </el-form-item>
    </el-row>
    <el-row>
      <el-col :span="20">
        <el-form-item label="关键词:" prop="keyword">
          <el-tag
            :key="tag"
            v-for="tag in dynamicTags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)">
            {{tag}}
          </el-tag>
          <el-input
            class="input-new-tag common_font_size"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="mini"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          >
          </el-input>
          <el-button v-else class="button-new-tag" size="mini" @click="showInput">+ 新关键词</el-button>
        </el-form-item>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <template v-if="positionId === -1">
      <el-button
        id="submitButton"
        size="small"
        type="primary"
        @click="submit()">
        发 布
      </el-button>
    </template>
    <template v-else>
      <el-button
        id="alterButton"
        size="small"
        type="primary"
        @click="alter()">
        更 新
      </el-button>
    </template>
  </el-form>
</template>

<script>
  export default {
    name: "PositionItem",
    props: {
      positionId: {
        type: Number,
        required: true
      }
    },
    data() {
      var checkNumber = (rule, value, callback) => {
        // if (!value) {
        //   return callback(new Error('招聘人数不能为空'));
        // }
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        } else {
          if (value < 1) {
            callback(new Error('必须大于0'));
          } else {
            callback();
          }
        }
      }
      return {
        rules: {
          name: [{required: true, message: '请输入职位名称', trigger: 'blur'}],
          address: [{required: true, message: '请输入工作地址', trigger: 'blur'}],
          salaryId: [{required: true, message: '请选择年薪', trigger: 'blur'}],
          degreeId: [{required: true, message: '请选择学历', trigger: 'blur'}],
          experienceId: [{required: true, message: '请选择经验要求', trigger: 'blur'}],
          description: [{required: true, message: '请输入职位描述', trigger: 'blur'}],
          natureId: [{required: true, message: '请选择工作性质', trigger: 'blur'}],
          number: [{required: true, message: '请输入招聘人数', trigger: 'blur'}, {
            pattern: /(^[1-9]\d*$)/,
            message: '请输入正确数值',
            trigger: 'blur'
          }],
          // keyword: [{required: true, message: '请输入职位名称', trigger: 'blur'}],
        },
        position: {
          userId: '',
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
        dynamicTags: [],
        inputVisible: false,
        inputValue: ''
      }
    },
    mounted() {
      this.initData()
      this.getPosition()
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
      },
      getPosition() {
        if (this.positionId != null && this.positionId != -1) {
          this.$axios.get('/positions/getById?positionId=' + this.positionId).then(resp => {
            if (resp.data.code === 200) {
              this.position = resp.data.data
              this.sentenceToTags()
            }
          })
        }
      },
      sentenceToTags() {
        //处理关键词，按空格隔切分填入tag数组
        let kwSentence = this.position.keyword
        this.dynamicTags = []
        kwSentence.split(' ').forEach((key, index) => {
          this.dynamicTags.push(key)
        })
      },
      tagsToSentence() {
        //处理关键词，将tag连句用空格隔开
        this.position.keyword = ''
        this.dynamicTags.forEach((key, index) => {
          this.position.keyword = this.position.keyword + ' ' + key
        })
      },
      submit() {
        this.$refs['posForm'].validate(valid => {
          if (valid) {
            this.tagsToSentence()
            //创建该职位的用户id
            this.position.userId = this.$store.state.user.id
            this.$axios.post('/positions', this.position).then(resp => {
              if (resp.data.code === 200) {
                this.$notify({
                  message: '发布职位成功',
                  type: 'success'
                })
                let button = document.getElementById('submitButton');
                button.style.background = '#D4D4D4'
                button.innerHTML = '已发布'
                button.disabled = true
              } else {
                this.$notify.error('发布职位失败')
              }
            })
          }
        })
      },
      alter() {
        this.$refs['posForm'].validate(valid => {
          if (valid) {
            this.tagsToSentence()
            this.$axios.put('/positions', this.position).then(resp => {
              if (resp.data.code === 200) {
                this.$notify({
                  message: '更新成功',
                  type: 'success'
                })
              } else {
                this.$notify.error('更新失败')
              }
            })
          }
        })
      },
      handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },
      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.dynamicTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      }
    }
  }
</script>

<style>
  .el-tag + .el-tag {
    margin-left: 10px;
  }

  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }

  .el-form-item__content {
    float: left;
  }
</style>
