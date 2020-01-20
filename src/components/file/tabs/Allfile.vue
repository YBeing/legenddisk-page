<template>
  <div>
  <Row>
    <Col span="6">
      <div style="float: left">
      <Upload
        multiple
        action="//jsonplaceholder.typicode.com/posts/">
        <Button type="info">上传</Button>
      </Upload>
      </div>
      <div style="float: left">
      <Button @click="mkdir" >新建文件夹</Button>
      <Button  >离线下载</Button>
      <Button  >我的设备</Button>
      </div>
    </Col>
    <Col span="4" offset="10">
      <Input search placeholder="搜索您的文件" style="width: auto" />
    </Col>
  </Row>
  <Row>
    <Col span="8">
      <Breadcrumb>
        <BreadcrumbItem to="/Index">Home</BreadcrumbItem>
        <BreadcrumbItem to="/">Components</BreadcrumbItem>
        <BreadcrumbItem>Breadcrumb</BreadcrumbItem>
      </Breadcrumb>
    </Col>
  </Row>
    <br>
  <Row>
    <Col span="22">
      <div>
        <Table   ref="selection" :columns="columns4" :data="data1">
          <template slot-scope="{ row, index }" slot="rightclickmenu"  >
              <a @dblclick="openModel()">
                {{row.name}}
              </a>
            </Dropdown>
          </template>
          <template slot-scope="{ row, index }" slot="action"  >
            <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">下载</Button>
          </template>

        </Table>
        <Modal v-model="makedirflag" draggable scrollable title="Modal 1">
          <p slot="header" style="color:#f60;text-align:center">
            <span>创建文件夹</span>
          </p>
          <div style="text-align:center">
               <Input search enter-button="确认" v-model="filename" @on-search="makedirJava" placeholder="新建文件夹" />

          </div>
          <div slot="footer">
          </div>
        </Modal>
      </div>
    </Col>
  </Row>

  </div>
</template>

<script>
    export default {
        name: "Allfile",
        data () {
          return {
            /*当前所选文件的下标*/
            currIndex:0,
            makedirflag:false,
            filename:"",
            oldfilename:"",
            /*当前所在目录层级*/
            currentLevelIndex:1,
            columns4: [
              {
                type: 'selection',
                width: 60,
                align: 'center'
              },
              {
                title: 'id',
                key: 'did',

              },
              {
                title: '文件名',
                key: 'dirname',

              },
              {
                title: '文件路径',
                key: 'dirpath',

              },
              {
                title: '文件类型',
                key: 'type',

              },
              {
                title: '用户',
                key: 'username'
              },
              {
                title: '操作',
                key: 'address',
                slot: 'action',
              }
            ],
            data1: [

            ]
          }
        },
        //页面加载之前读取第一层级的目录
        mounted() {
          this.getLevelOneDirList();

        },
        methods: {
          handleSelectAll (status) {
            this.$refs.selection.selectAll(status);
          },
          mkdir(){
            this.openModel();

          },
          show (index) {
            this.$Modal.info({
              title: 'User Info',
              content: `Name：${this.data1[index].name}<br>Age：${this.data1[index].age}<br>Address：${this.data1[index].address}`
            })
          },
          remove (index) {
            this.data1.splice(index, 1);
          },
          renamefile(){
            this.renamefileDir=false;
            this.oldfilename=this.data1[this.currIndex].name;
            this.data1[this.currIndex].name=this.filename;
            this.renameJavaDir();
          },
          openModel(){
            this.makedirflag=true;
          },
          makedirJava(){
            this.$ajax({
              method:"post",
              url: "http://localhost:9080/legenddisk/file/makeDir",
              data: {
                directory: this.filename,
                index: this.currentLevelIndex,
              }

            }).then(resp => {  //响应结果
              this.$Message.warn(resp.data.msg);

            }).catch(err => {
              console.log('请求失败：'+err.status+','+err.statusText);
            });
          },
          renameJavaDir(){
            this.$ajax({
              method:"post",
              url: "http://localhost:9080/legenddisk/file/renameFileDir",
              data: {
                oldDirectory: this.oldfilename,
                newDirectory: this.filename,
              }

            }).then(resp => {  //响应结果

            }).catch(err => {
              console.log('请求失败：'+err.status+','+err.statusText);
            });
          },
          getLevelOneDirList(){
            this.$ajax({
              method:"post",
              url: "http://localhost:9080/legenddisk/file/getLevelOneDirList",
              data: {

              }

            }).then(resp => {  //响应结果
              this.data1=resp.data;
              console.log(this.data1)
            }).catch(err => {
              console.log('请求失败：'+err.status+','+err.statusText);
            });
          }



        }

    }
</script>

<style scoped>

</style>
