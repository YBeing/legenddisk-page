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
<!--        <BreadcrumbItem ><a @click="test2">Home</a></BreadcrumbItem>-->
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
<!--            <Dropdown trigger="contextMenu" style="margin-left: 20px">-->
              <a @dblclick="openModel(index)">
                {{row.name}}
<!--                <Icon type="ios-arrow-down"></Icon>-->
              </a>
<!--              <DropdownMenu slot="list">-->
<!--                <DropdownItem style="color: blue"  ><a @click="openModel(index)">重命名</a></DropdownItem>-->
<!--                <DropdownItem style="color: #ed4014">下载</DropdownItem>-->
<!--              </DropdownMenu>-->
            </Dropdown>
          </template>
          <template slot-scope="{ row, index }" slot="action"  >
            <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">下载</Button>
<!--            <Button type="error" size="small" @click="remove(index)">Delete</Button>-->
          </template>

        </Table>
        <Modal v-model="renamefileDir" draggable scrollable title="Modal 1">
          <p slot="header" style="color:#f60;text-align:center">
<!--            <Icon type="ios-information-circle"></Icon>-->
            <span>重命名文件夹</span>
          </p>
          <div style="text-align:center">
               <Input search enter-button="确认" v-model="filename" @on-search="renamefile" placeholder="新建文件夹" />

          </div>
          <div slot="footer">
<!--            <Button type="error" size="large"  >Delete</Button>-->
          </div>
<!--          <div>This is the first modal</div>-->
<!--          <Input search enter-button="确认" placeholder="Enter something..." />-->
        </Modal>
<!--        <Button @click="handleSelectAll(true)">Set all selected</Button>-->
<!--        <Button @click="handleSelectAll(false)">Cancel all selected</Button>-->
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
            renamefileDir:false,
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
                title: '文件名',
                key: 'name',
                slot: 'rightclickmenu',

              },
              {
                title: '大小',
                key: 'age'
              },
              {
                title: '操作',
                key: 'address',
                slot: 'action',
              }
            ],
            data1: [
              {
                name: 'John Brown',
                age: 18,
                address: 'New York No. 1 Lake Park',
              },
              {
                name: 'Jim Green',
                age: 24,
                address: 'London No. 1 Lake Park',
              },
              {
                name: 'Joe Black',
                age: 30,
                address: 'Sydney No. 1 Lake Park',
              },
              {
                name: 'Jon Snow',
                age: 26,
                address: 'Ottawa No. 2 Lake Park',
              }
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
             this.showflag=false;
             this.showflag2=true;
             this.data1.push({
               name: '新文件夹',
               age: 30,
               address: '新文件夹',
               date: '2019-12-06'
             });
             this.filename="新文件夹";
            this.makedirJava();

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
          openModel(index){
            this.renamefileDir=true;
            this.currIndex=index;


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
              url: "http://localhost:9080/legenddisk/file/renameFileDir",
              data: {
                oldDirectory: this.oldfilename,
                newDirectory: this.filename,
              }

            }).then(resp => {  //响应结果

            }).catch(err => {
              console.log('请求失败：'+err.status+','+err.statusText);
            });
          }



        }

    }
</script>

<style scoped>

</style>
