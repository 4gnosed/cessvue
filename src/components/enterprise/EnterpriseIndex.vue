<template>
  <div style="height: 1500px">
    <el-dialog
      :visible.sync="dialogVisible"
      width="80%">
      <div>
        <div style="margin-bottom: 20px;margin-left: -1300px">
          <el-button
            size="middle"
            type="primary"
            @click="addTab(editableTabsValue)">
            添加职位
          </el-button>
<!--          <el-button-->
<!--            size="middle"-->
<!--            type="primary"-->
<!--            @click="submitAll()">-->
<!--            全部提交-->
<!--          </el-button>-->
        </div>
        <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab">
          <el-tab-pane class="tab"
                       v-for="(item, index) in editableTabs"
                       :key="item.name"
                       :label="item.title"
                       :name="item.name"
          >
            <position-item></position-item>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-dialog>
    <el-button type="primary" @click="addPosition">发布职位</el-button>
  </div>
</template>

<script>
  import PositionItem from "../admin/enterprise/PositionItem";

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
      },
      submitAll() {
        // positionItem.methods.sayHello()
      }
    }
  }
</script>

<style scoped>

</style>
