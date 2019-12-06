<template>
  <div>
    <Row>
      <Col id="header" span="3"  >
        <div style="height: 5vh; padding-top: 3px; padding-left: 3px">
            <Icon type="md-cloud-circle"size="34" color="cadetblue" />
            <a style="font-family: 'PingFang SC'; font-size: 20px; color: black">百度网盘</a>


          </div>
      </Col>
      <Col  span="3"offset="16">
        <div style="padding-top: 3px; height: 5vh;">
          <Poptip trigger="hover" width="350" >
            <img style="padding-top: 2px" width="30px" height="30px" src="../../assets/background-img/微信图片_20191122104955.jpg">
            <a style="font-family: 'PingFang SC'; font-size: 14px; color: black" >上帝希望我孤独</a>
            <div class="api" slot="content">
              <Card style="width:320px">
                <div   style="text-align:center">
                  <img width="30px" height="30px" src="../../assets/background-img/微信图片_20191122104955.jpg"><span>上帝希望我孤独</span>
                  <p style="border-bottom: 1px sienna solid">
                  </p>
<!--                  <Tag type="dot"   color="error">个人资料</Tag>-->
<!--                  <Tag type="dot"   color="warning">注销</Tag>-->
                  <a style="color: #42b983;">个人资料</a><br>
                  <a style="color: #42b983;">注销</a>
                </div>
              </Card>
            </div>
          </Poptip>
        </div>
      </Col>

    </Row>

  <Row>
      <Col span="4">
        <div style="height: 95vh;  ">
          <Menu :theme="theme3" active-name="1">
            <MenuGroup title="文件">
              <MenuItem name="allfile">
                <Icon type="md-document" />
                <a style="color: black" @click="handleTabsAdd('allfile')">全部文件</a>
              </MenuItem>
              <MenuItem name="doc">
                <Icon type="md-document" />
                <a style="color: black" @click="handleTabsAdd('doc')">文档</a>
              </MenuItem>
              <MenuItem name="img">
                <Icon type="md-images" />
                <a style="color: black" @click="handleTabsAdd('img')">图片</a>

              </MenuItem>
              <MenuItem name="video">
                <Icon type="logo-youtube" />
                视频
              </MenuItem>
              <MenuItem name="bt">
                <Icon type="md-download" />
                种子
              </MenuItem>
              <MenuItem name="music">
                <Icon type="ios-musical-notes" />
                音乐
              </MenuItem>
              <MenuItem name="other">
                <Icon type="ios-infinite" />

                其他
              </MenuItem>
            </MenuGroup>
            <MenuGroup title="回收站">
              <MenuItem name="trash">
                <Icon type="md-trash" />
                回收文件
              </MenuItem>
            </MenuGroup>
          </Menu>
        </div>
      </Col>
      <Col span="20">
        <div style="height: 95vh;  ">
          <Tabs :value="activeName" >
            <TabPane  v-for="(item, index) in editableTabs2"
                      :key="item.name"
                      :label="item.title"
                      :name="item.name" >
              <component :is="item.content"></component>
            </TabPane>
          </Tabs>

        </div>

      </Col>
    </Row>
  </div>
</template>

<script>
  import Doc from '@/components/file/tabs/Doc'
  import Img from '@/components/file/tabs/Img'
  import Allfile from '@/components/file/tabs/Allfile'

  export default {
        name: "Index",
        data(){
          return{
            theme3: 'light',
            editableTabs2: [
              {
                title: '全部文件',
                name: 'allfile',
                content: Allfile
              }
            ],
            activeName: "allfile",

          }
        },
      methods: {
        handleTabsAdd (name) {
          let  component=null;
          if(name=="doc"){
            component=Doc;
          }
          if(name=="img"){
            component=Img;
          }
          if(name=="allfile"){
            component=Allfile;
          }
          let tabs = this.editableTabs2;
          let addFlag=true;
          if (tabs.length>0){
            tabs.forEach((tab, index) => {
              if(tab.name==name){

                addFlag=false;
              }
            });
          }
          if(addFlag){
            this.editableTabs2.push({
              title: name,
              name: name,
              content: component,
            });
          }
          this.activeName = name;

        }
      }
    }
</script>

<style scoped>
</style>
