<template>
  <div class="appAdd">
    <div class="appAdd_content">
      <div class="form_box">
        <el-form ref="form" :model="form" label-width="180px">
          <el-form-item label="标题" prop="noticeTitle">
            <el-input v-model="form.noticeTitle" placeholder="请输入标题" class="int"></el-input>
          </el-form-item>
          <el-form-item label="作者" prop="author">
            <el-input v-model="form.author" placeholder="请输入作者" class="int"></el-input>
          </el-form-item>
          <div class="choice">
            <el-form-item label="是否热门">
              <el-select v-model="form.whetherHot" placeholder="请选择是否热门" class="select_">
                <el-option v-for="dict in hotOptions" :key="dict.value" :label="dict.label"
                           :value="dict.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否首页弹出">
              <el-select v-model="form.whetherIndexPopup" placeholder="请选择是否首页弹出"  class="select_">
                <el-option v-for="dict in popupOptions" :key="dict.value" :label="dict.label"
                           :value="dict.value"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="choice">
            <el-form-item label="是否显示在APP">
              <el-select v-model="form.whetherShowApp" placeholder="请选择是否显示在APP"  class="select_">
                <el-option v-for="dict in appOptions" :key="dict.value" :label="dict.label"
                           :value="dict.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否置顶">
              <el-select v-model="form.whetherTop" placeholder="请选择是否置顶"  class="select_">
                <el-option v-for="dict in topOptions" :key="dict.value" :label="dict.label"
                           :value="dict.value"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <el-form-item label="内容">
          <el-upload
            class="avatar-uploader"
            :action="serverUrl"
            name="file"
            :headers="header"
            :show-file-list="false"
            :on-success="uploadSuccess"
            :on-error="uploadError"
            :before-upload="beforeUpload"
            style="display: none"
          >
          </el-upload>
          <quill-editor
            v-model="form.noticeContent"
            ref="myQuillEditor"
            :options="editorOption"
            @change="onEditorChange($event)"
          >
          </quill-editor>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="appAdd_footer">
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" @click="affirm">保存</el-button>
    </div>
  </div>
</template>

<script>
import {appAdd} from '@/api/appAdministration/systemNotice'
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],  // toggled buttons
  [{'header': 1}, {'header': 2}],    // custom button values
  [{'list': 'ordered'}, {'list': 'bullet'}],
  [{'indent': '-1'}, {'indent': '+1'}],   // outdent/indent
  [{'direction': 'rtl'}],       // text direction
  [{'size': ['small', false, 'large', 'huge']}], // custom dropdown
  [{'header': [1, 2, 3, 4, 5, 6, false]}],
  [{'color': []}, {'background': []}],   // dropdown with defaults from theme
  [{'font': []}],
  [{'align': []}],
  ['link', 'image'],
  ['clean']

]
export default {
  name: "appAdd",
  data() {
    return {
      form: {},// add表单参数
      hotOptions: [//是否热门
        {
          value: '0',
          label: '是'
        },
        {
          value: '1',
          label: '否'
        },
      ],
      popupOptions: [//是否首页弹出
        {
          value: '0',
          label: '是'
        },
        {
          value: '1',
          label: '否'
        },
      ],
      appOptions: [//是否显示在APP
        {
          value: '0',
          label: '是'
        },
        {
          value: '1',
          label: '否'
        },
      ],
      topOptions: [//是否置顶
        {
          value: '0',
          label: '是'
        },
        {
          value: '1',
          label: '否'
        },
      ],
      quillUpdateImg: false, // 根据图片上传状态来确定是否显示loading动画，刚开始是false,不显示
      editorOption: {
        placeholder: '',
        theme: 'snow', // or 'bubble'
        modules: {
          toolbar: {
            container: toolbarOptions,
            handlers: {
              'image': function (value) {
                if (value) {
                  // 触发input框选择图片文件
                  document.querySelector('.avatar-uploader input').click()
                } else {
                  this.quill.format('image', false);
                }
              }
            }
          }
        }
      },
      serverUrl: 'http://192.168.101.14:8080/api/v1/upload', // 这里写你要上传的图片服务器地址
      header: {
        // token: sessionStorage.token
      } // 有的图片服务器要求请求头需要有token
    }
  },
  methods: {
    cancel() {//取消
      this.$router.push({
        path: '/appAdministration/systemNotice'
      })
    },
    affirm() {//确认
      this.$router.push({
        path: '/appAdministration/systemNotice'
      })
      appAdd(this.form).then((res) => {
        if (res.code == 200) {
          this.$message.success('添加成功')
        } else {
          this.$message.error('添加失败')
        }
      })
    },

    onEditorChange({editor, html, text}) {//内容改变事件
      this.form.noticeContent = html
    },
    // 富文本图片上传前
    beforeUpload() {
      // 显示loading动画
      this.quillUpdateImg = true
    },
    uploadSuccess(res, file) {
      // res为图片服务器返回的数据
      // 获取富文本组件实例
      let quill = this.$refs.myQuillEditor.quill
      // 如果上传成功
      if (res.code == 200 ) {
        // 获取光标所在位置
        let length = quill.getSelection().index;
        // 插入图片 res.url为服务器返回的图片地址
        quill.insertEmbed(length, 'image', res.data)
        // 调整光标到最后
        quill.setSelection(length + 1)
        this.$message.success('上传成功')
      } else {
        this.$message.error('图片插入失败')
      }
      // loading动画消失
      this.quillUpdateImg = false
    },
    // 富文本图片上传失败
    uploadError() {
      // loading动画消失
      this.quillUpdateImg = false
      this.$message.error('图片插入失败')
    }
  }
}
</script>

<style scoped>
.appAdd_content {
  padding: 20px;
  box-sizing: border-box;
}

.appAdd_footer {
  width: 100%;
  position: fixed;
  bottom: 0;
  z-index: 99;
  background: white;
  box-shadow: 2px 4px 6px #000;
  text-align: center;
  height: 60px;
  line-height: 60px;
}
.appAdd_content>>>.ql-editor.ql-blank, .ql-editor {
  height: 280px;
}
.appAdd_content>>>.ql-editor{
  height: 280px;
}
.appAdd_content>>>.quill-editor{
  width: 1000px;
}
.int{
  width: 1000px;
}
.choice{
  display: flex;
}
.select_{
  width: 410px;
}
</style>
