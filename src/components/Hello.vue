<template>
  <div>
    <el-table :data="items"
              :key="randomKey"
              @cell-dblclick="editData"
              style="width: 100%">
      <el-table-column label="日期"
                       property="date"
                       width="140">
        <template slot-scope="scope">
          <el-input v-if="scope.row[scope.column.property + 'isShow']"
                    :ref="scope.column.property"
                    v-model="scope.row.date"
                    @blur="alterData(scope.row,scope.column)"></el-input>
          <span v-else>{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column label="顺序"
                       property="id"
                       width="140">
        <template slot-scope="scope">
          <el-input v-if="scope.row[scope.column.property + 'isShow']"
                    :ref="scope.column.property"
                    v-model="scope.row.id"
                    @blur="alterData(scope.row,scope.column)"></el-input>
          <span v-else>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: [
        { date: '2016-05-03', id: '0' },
        { date: '2016-05-04', id: '1' },
        { date: '2016-05-05', id: '2' },
        { date: '2016-05-06', id: '3' },
      ],
      randomKey: Math.random(),
    }
  },
  methods: {
    editData (row, column) {
      row[column.property + "isShow"] = true
      //refreshTable是table数据改动时，刷新table的
      this.refreshTable()
      this.$nextTick(() => {
        this.$refs[column.property] && this.$refs[column.property].focus()
      })


    },
    alterData (row, column) {
      row[column.property + "isShow"] = false
      this.refreshTable()
    },
    refreshTable () {
      this.randomKey = Math.random()
    },
  }

}
</script>
