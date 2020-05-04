<template>
  <div style="height: 1000px;margin-top: 50px">
    <el-dialog
      title="填写职位信息"
      :visible.sync="dialogVisible"
      width="80%">
      <el-row>
        <el-col :span="2">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-plus"
            @click="addTab(editableTabsValue)">
            增加职位
          </el-button>
        </el-col>
        <el-col :span="2" style="margin-left: 10px">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-minus"
            @click="removeTab(editableTabsValue)">
            移出职位
          </el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-tabs v-model="editableTabsValue" type="card" style="margin-top: 20px">
          <el-tab-pane class="tab" v-for="(item, index) in editableTabs" :key="item.name" :label="item.title"
                       :name="item.name">
            <position-item v-bind:positionId=-1></position-item>
          </el-tab-pane>
        </el-tabs>
      </el-row>
    </el-dialog>
    <el-button type="primary" @click="addPosition">发布职位</el-button>
  </div>
</template>

<script>
  import PositionItem from "./PositionItem";

  let positionItem = PositionItem
  export default {
    name: "enterprise",
    components: {PositionItem},
    data() {
      return {
        dialogVisible: false,
        editableTabsValue: '1',
        editableTabs: [{
          title: '新职位',
          name: '1',
          content: ''
        }],
        tabIndex: 1,
      }
    },
    mounted() {
    },
    methods: {
      addPosition() {
        this.dialogVisible = true
      },
      addTab(targetName) {
        let newTabName = ++this.tabIndex + '';
        this.editableTabs.push({
          title: '新职位',
          name: newTabName,
          content: 'New Tab content'
        });
        this.editableTabsValue = newTabName;
      },
      removeTab(targetName) {
        let tabs = this.editableTabs;
        let activeName = this.editableTabsValue;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }

        this.editableTabsValue = activeName;
        this.editableTabs = tabs.filter(tab => tab.name !== targetName);
      }
    }
  }
</script>

<style scoped>

</style>
