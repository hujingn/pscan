<template>
  <div class="ps-grid">
    <div class="ps-header">
      <el-menu
        class="el-menu-demo"
        mode="horizontal"
        @select="handleMenuSelect"
        background-color="#494949"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-submenu index="1">
          <template slot="title">文件</template>
          <el-menu-item index="1-1">新建...</el-menu-item>
          <el-menu-item index="1-2">打开...</el-menu-item>
          <el-menu-item index="1-3">保存</el-menu-item>
          <el-menu-item index="1-4">另存为</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">编辑</template>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
          <el-menu-item index="2-3">选项3</el-menu-item>
          <el-submenu index="2-4">
            <template slot="title">选项4</template>
            <el-menu-item index="2-4-1">选项1</el-menu-item>
            <el-menu-item index="2-4-2">选项2</el-menu-item>
            <el-menu-item index="2-4-3">选项3</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="3">图像</el-menu-item>
        <el-menu-item index="4">图层</el-menu-item>
        <el-menu-item index="5"><a href="https://www.ele.me" target="_blank">帮助</a></el-menu-item>
      </el-menu>
    </div>
    <div class="ps-left"></div>
    <div class="ps-main">
      <div class="ps-tab">
        <el-tabs v-model="currentLayerId" closable>
          <el-tab-pane
            v-for="layer in layers"
            :key="layer.id"
            :label="layer.name"
            :name="`${layer.id}`">{{ layer.name }}</el-tab-pane>
        </el-tabs>
      </div>
      <div class="ps-canvas">
        <div
          ref="layers"
          v-for="(layer, i) in layers"
          :key="i"
          :v-if="`${layers.id}` === currentLayerId">
          {{ `${layers.id}` === currentLayerId }}
        </div>
      </div>
    </div>
    <div class="ps-right">
      <el-button @click="test">test</el-button>
    </div>
    <div class="ps-footer">
      {{ layers }}

      <input
        ref="inputFile"
        accept="image/*"
        @change="inputFileChange"
        class="hide-file"
        type="file">
    </div>
  </div>
</template>

<script>
import Pscan from '@/pscan';

export default {
  name: 'home',
  data() {
    return {
      layers: [],
      currentLayerId: '',
    };
  },
  mounted() {},
  methods: {
    test() {
      this.layers[0].test();
    },
    // 打开文件
    handleMenuSelect(val) {
      if (val === '1-1') {
        console.log(val);
      } else if (val === '1-2') {
        this.$refs.inputFile.click();
      }
    },
    // 选择一个本地图片
    inputFileChange(e) {
      const file = e.target.files[0];
      const psCan = new Pscan(file);
      const { canvas } = psCan;
      this.layers.push(psCan);
      this.currentLayerId = `${psCan.id}`;
      this.$nextTick(() => {
        const len = this.layers.length;
        this.$refs.layers[len - 1].appendChild(canvas);
      });
    },
  },
};
</script>
<style lang="scss">
.ps-grid {
  width: 100%;
  height: 100%;
  background-color: #494949;
  display: grid;
  grid-gap: 2px;
  grid-template-columns: 40px auto 200px;
  grid-template-rows: 40px auto 40px;
  grid-auto-flow: row;

  grid-template-areas:
    "a a a"
    "b c d"
    "b e d";
  .ps-header {
    grid-area: a;
  }
  .ps-left {
    grid-area: b;
  }
  .ps-main {
    grid-area: c;

    display: flex;
    flex-direction: column;
    font-size: 0;
    line-height: 0;

    .ps-tab {
      height: 30px;
      color: #ffffff;
    }
    .ps-canvas {
      flex: 1;

      display: flex;
      flex-direction: column;
      background-color: #282828;
      overflow: auto;
      justify-content: center;
      align-items: center;
    }
  }
  .ps-right {
    grid-area: d;
  }
  .ps-footer {
    grid-area: e;

    color: white;
  }

  .el-menu {
    &.el-menu--horizontal {
      border-bottom: 1px solid #444444;
    }
    .el-menu-item,
    .el-submenu {
      height: 40px;
      line-height: 40px;
    }
    .el-submenu .el-submenu__title {
      height: 40px;
      line-height: 40px;
    }
  }

  .el-tabs {
    .tab-first {
      padding-left: 20px;
    }
    .el-tabs__item {
      color: #ffffff;
      height: 30px;
      line-height: 30px;
      font-size: 12px;

      &.is-active {
        color: #ffffff;
        background-color: #666666;
      }
    }
    .el-tabs__nav-wrap::after {
      height: 0;
    }
    .el-tabs__active-bar {
      height: 0;
    }
    .el-tabs__nav-scroll {
      padding-left: 0;
    }
    .el-tabs__nav {
      .el-tabs__item:nth-child(2) {
        padding-left: 20px;
      }
      .el-tabs__item:last-child {
        padding-right: 20px;
      }
    }
  }

  .hide-file {
    display: inline-block;
    width: 0;
    height: 0;
    opacity: 0;
  }
}
</style>
