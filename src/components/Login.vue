el<template>
    <!-- # Logim 컴포넌트: 로그인 화면 -->
    <el-container class="login-container">
        <el-main class="login-box">
            <p>
                <strong style="color:#606266;">vue-diary</strong>
            </p>
            <el-form :model="loginForm" ref="loginForm">
                <el-form-item
                    prop="user"
                    :rules="[
                        {required:true, message: '이름을 입력해주세요.', trigger: 'blur'}
                    ]"
                >
                    <el-input 
                        type="text"
                        maxlength="10"
                        show-word-limit
                        v-model="loginForm.user" 
                        @keyup.enter.native="submitForm('loginForm')"
                        placeholder="사용자 이름"
                        class="width-80"
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button class="width-80" type="primary" plain @click="submitForm('loginForm')">Sign in</el-button>
                </el-form-item>
            </el-form>
        </el-main>
    </el-container>
</template>
<script>
import { MessageBox } from 'element-ui';

    export default {
        data() {
            return {
                loginForm: {
                    user: ''
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$store.commit('login', {
                        user: this.loginForm.user
                    })

                    // 로그인 성공시 메세지 제공
                    this.$message({
                    type: 'info',
                    message: `${ this.loginForm.user }님 반갑습니다.`
                    });    
                    
                    // 목록 화면으로 전환
                    this.$router.push({ path: '/diary/list'} );  
                                      
                } else {  
                    return false;
                }
                });
            }
        }
    }
</script>
<style scoped>
    .login-container {
        height: 100vh;
        background: #6190E8;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #A7BFE8, #6190E8);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #A7BFE8, #6190E8); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

    }

    .login-box {
        background-color: #FFFFFF;
        border : 1px solid #DCDFE6; 
        position:absolute;
        width: 30%;
        top:50%; left:50%;
        transform: translate(-50%, -50%);
        padding: 30px; 
        text-align: center;
        border-radius: 15px;
    }

    .width-80 {
        width: 80%;
    }
</style>