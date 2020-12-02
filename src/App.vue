<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default  {
  name:  'App',
}
</script>
<style>
  /*全局布局字体调整*/
  .el-menu-item{
    height: 45px !important;
    line-height: 45px !important;
    font-size: 12px !important;
  }
  .el-submenu__title{
    height: 45px !important;
    line-height: 45px !important;
    font-size: 12px !important;
  }
  .sidebar-title{
    font-size: 12px !important;
  }
  .el-form-item__label{
    font-size: 12px !important;
  }
  .app-breadcrumb.el-breadcrumb{
    font-size: 12px !important;
  }
  .navbar .right-menu .right-menu-item{
    font-size: 12px !important;
  }
  .svg-icon{
    font-size: 12px !important;
  }
  .el-table th > .cell{
    font-size: 12px !important;
  }
  .el-tree-node__label{
    font-size: 12px !important;
  }
  .el-button--mini{
    padding: 6px 15px;
  }
  .el-table .cell{
    font-size: 12px !important;
  }
  .el-card__header{
    font-size: 12px !important;
  }
  .list-group-item{
    font-size: 12px !important;
  }
  .el-tabs__item{
    font-size: 12px !important;
  }
</style>
