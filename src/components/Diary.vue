<template>
    <!-- 
        # Diary 컴포넌트
            # diary-header: 사용자 정보, 로그아웃
            # diary-content: url 받아서 router view 표시 (리스트, 쓰기, 상세정보)
    -->
    <el-container>
    <!-- 상단 el header 시작 -->
    <el-header id="diary-header">
        <el-row :gutter="2">
            <el-col :span="18">
                <span class="header-title" @click="goList">
                    <i class="el-icon-notebook-2"></i> vue-diary
                </span>
            </el-col>
            <el-col :span="6" style="text-align: right;">
                <span class="header-user-name">{{ user }}님</span>
                <el-button round @click="logout">Sign out</el-button>
            </el-col>
        </el-row>
    </el-header>
    <!-- 상단 el header 끝 -->
    <!-- 하단 el content 시작 -->
    <el-main>
        <router-view/>
    </el-main>
    <!-- 하단 el content 끝 -->
    </el-container>
</template>
<script>
    import { mapState, mapMutations } from 'vuex'

    export default {
        computed: {
            ...mapState(['user'])
        },
        methods: {
            ...mapMutations(['logout']),
            logout() {
                // 로그아웃 관련 메서드 > confirm messagebox가 나오게 함 
                this.$confirm('로그아웃 하시겠습니까?', 'Warning', {
                    confirmButtonText: '네',
                    cancelButtonText: '아니오',
                    type: 'warning'
                }).then(() => {
                    this.$router.push({ path: '/'}); 
                    this.$message({
                        type: 'success',
                        message: `${this.user}님 안녕히가세요.`
                    });
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '로그아웃에 실패하셨습니다.'
                });          
        });
            },
            goList() {
                this.$router.push({ path: '/diary/list'}).catch(() => {}); 
            },          
        }
    }
</script>
<style>
    /* 상단 header 부분 */
    #diary-header {
        background: #6190E8;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #A7BFE8, #6190E8);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #A7BFE8, #6190E8); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        padding:15px;
        vertical-align: middle;
    }

    .header-title {
        font-weight: bold;
        cursor: pointer;
        color: #FFFFFF;
    }

    .header-user-name {
        margin-right: 10px;
        color: #FFFFFF; 
    }

    /* 하단 content 부분 */
    #diary-content {
        padding: 25px; 
    }
    
</style>