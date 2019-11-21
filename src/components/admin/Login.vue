<template>
  <div id="bk1">
    <div id="form1">

      <span style="color: white;">账号</span><Input v-model="value14" placeholder="Account" clearable style="width: 200px" /><br><br>
      <span style="color: white">密码</span><Input v-model="value18" type="password" password placeholder="password" style="width: 200px" />
    </div>
    <div style="text-align: center">
      <br>
      <Button type="default" ghost>登录</Button>&nbsp;
      <Button type="default" ghost @click="modal12 = true">注册</Button>
    </div>
    <Modal v-model="modal12" draggable scrollable ok-text="OK"
           cancel-text="Cancel" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="md-people"></Icon>
        <span>Registary account</span>
      </p>
      <div>
        <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
          <FormItem prop="user">
            <Input type="text" v-model="formInline.user" placeholder="Username">
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
        value14: '',
        value18: '',
        modal12: false,
        formInline: {
          user: '',
          password: ''
        },
        ruleInline: {
          user: [
            { required: true, message: 'Please fill in the user name', trigger: 'blur' }
          ],
          password: [
            { required: true, message: 'Please fill in the password.', trigger: 'blur' },
            { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
          ]
        }

      }
    },
    methods: {
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('Success!');
          } else {
            this.$Message.error('Fail!');
          }
        })
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

