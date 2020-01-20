<template>
  <div id="bk1">
    <div id="form1">

      <span style="color: white;">账号</span><Input v-model="username" placeholder="Account" clearable style="width: 200px" /><br><br>
      <span style="color: white">密码</span><Input v-model="password" type="password" password placeholder="password" style="width: 200px" />
    </div>
    <div style="text-align: center">
      <br>
      <Button type="default" ghost @click="login()">登录</Button>&nbsp;
      <Button type="default" ghost @click="modal12 = true">注册</Button>
    </div>
    <Modal v-model="modal12" draggable scrollable  width="360" @on-ok="handleSubmit">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="md-people"></Icon>
        <span>Registary account</span>
      </p>
      <div>
        <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
          <FormItem prop="username">
            <Input type="text" v-model="formInline.username" placeholder="Username">
              <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <br>
          <FormItem prop="password">
            <Input type="password" v-model="formInline.password" placeholder="Password">
              <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <!--<FormItem>
            <Button type="primary" @click="handleSubmit('formInline')">Signin</Button>
          </FormItem>-->
        </Form>
      </div>
    </Modal>












  </div>
</template>
<script>
  export default {
    name: "Login",

    data () {
      return {
        username: '',
        password: '',
        modal12: false,
        formInline: {
          username: '',
          password: ''
        },
        ruleInline: {
          user: [
            { required: true, message: '账号不能为空！', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '密码不能为空！', trigger: 'blur' },
          ]
        }

      }
    },

    methods: {
      handleSubmit() {

        this.$refs["formInline"].validate((valid) => {
          if (valid) {
            this.$ajax({
              method:"post",
              url: "http://localhost:9080/legenddisk/user/register",
              data: {
                record: JSON.stringify(this.formInline)

              }

            }).then(resp => {  //响应结果
              console.log(resp.data);
              if(resp.data.flag){
                this.$Message.success(resp.data.msg);
                this.$router.push("/Index");
              }else{
                this.$Message.error(resp.data.msg);
              }

            }).catch(err => {
              console.log('请求失败：'+err.status+','+err.statusText);
            });
            // this.$Message.success('Success!');
          } else {
            this.$Message.error('账号或密码格式不正确！');
          }
        });

      },
      login(){
        this.$ajax({
          method:"post",
          url: "http://localhost:9080/legenddisk/user/login",
          data: {
            username: this.username,
            password: this.password
          },



      }).then(resp => {  //响应结果
          console.log(resp.data);
          if(resp.data.flag){
            this.$Message.success(resp.data.msg);
            this.$router.push("/Index");
          }else{
            this.$Message.error(resp.data.msg);
          }

          }).catch(err => {
          this.$Message.error('请求失败：请检查网络环境');

          // console.log('请求失败：'+err.status+','+err.statusText);
          });
      },
      register(){
        this.$ajax({
          method:"post",
          url: "http://localhost:9080/legenddisk/user/register",
          data: {
            username: this.username,
            password: this.password
          }

        }).then(resp => {  //响应结果
          console.log(resp.data);
          if(resp.data.addflag){
            this.$Message.success("注册成功！");
            this.$router.push("/Login");
          }else{
            this.$Message.success("系统错误，注册失败！");

          }

        }).catch(err => {
          this.$Message.error('请求失败：'+err.status+','+err.statusText);
          // console.log('请求失败：'+err.status+','+err.statusText);
        });
      }
    }
  }
</script>
<style scoped>
  body{
    margin: 0;
  }
  #bk1{
    text-align: center;
    height:100vh;
    background: url("../../assets/background-img/atmosphere-blue-cloud-clouds-601798.jpg");
  }
  #form1{
    padding-top: 15%;
  }

</style>

