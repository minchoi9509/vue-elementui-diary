<template>
    <!-- 
        # Diary write 컴포넌트 
            글 쓰기, 수정을 동시에 할 수 있게 구성
    -->
    <el-container>
        <el-main>
        <el-form :model="diary" :rules="rules" ref="diaryForm" label-width="120px">
        <el-form-item label="제목" prop="title">
            <el-input v-model="diary.title"></el-input>
        </el-form-item>
        <el-form-item label="날씨" prop="weather">
            <el-radio-group v-model="diary.weather">
                <el-radio-button label="sunny"><i class="el-icon-sunny"></i></el-radio-button>
                <el-radio-button label="cloudy"><i class="el-icon-cloudy"></i></el-radio-button>
                <el-radio-button label="heavy-rain"><i class="el-icon-heavy-rain"></i></el-radio-button>
                <el-radio-button label="light-rain"><i class="el-icon-light-rain"></i></el-radio-button>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="기분" prop="emotion">
            <el-select v-model="diary.emotion">
                <el-option label="기쁨" value="기쁨"></el-option>
                <el-option label="화남" value="화남"></el-option>
                <el-option label="우울" value="우울"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="내용" prop="content">
            <el-input type="textarea" v-model="diary.content" rows="15"></el-input>
        </el-form-item>
        <el-form-item style="text-align: center;">
            <!-- type에 따라서 버튼이 다르게 보이게 함 -->
            <el-button v-if="type=='write'" type="primary" @click="submitForm('diaryForm')">저장</el-button>
            <el-button v-if="type=='update'" type="primary" @click="updateForm('diaryForm')">수정</el-button>
            <el-button @click="resetForm('diaryForm')">취소</el-button>
        </el-form-item>
        </el-form>
    </el-main>
    </el-container>
</template>
<script>

    export default {
        data(){
            return  {
                // vuex store에 저장 할 내용들 초기화 
                diary: {
                    title: '',
                    weather: '',
                    emotion: '',
                    content: '',
                    writer: this.$store.state.user,
                    date: new Date().toLocaleDateString(),
                    index: this.$store.state.diary.length + 1      
                },
                rules: {
                    title: [
                        { required: true, message: '제목을 입력해주세요', trigger: 'blur' }
                    ],
                    emotion:[
                        { required: true, message: '오늘의 기분을 입력해주세요', trigger: 'blur' }
                    ],
                    weather:[
                        { required: true, message: '오늘의 날씨를 입력해주세요', trigger: 'blur' }
                    ],
                    content: [
                        { required: true, message: '내용을 입력해주세요', trigger: 'blur' }
                    ]
                },
                type: this.$route.query.type             
            };
        },
        methods: {
            // 일기 목록 화면으로 전환
            goList(){
                this.$router.push({ path: '/diary/list'}); 
            },
            // 일기 작성
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                if (valid) {
                    // 작성 성공 이후 메세지
                    this.$message({
                    type: 'info',
                    message: `일기를 작성하였습니다.`
                    });  
                    // vuex store에 추가
                    this.$store.commit('writeDiary', {
                        diary: this.diary
                    })
                    // 리스트로 돌아감
                    this.$router.push({ path: '/diary/list'}); 

                } else {
                    this.$message({
                    type: 'info',
                    message: `양식을 확인해주세요.`
                    });  
                    return false;
                }
                });
            },
            // 일기 수정
            updateForm(formName) {
                this.$refs[formName].validate((valid) => {
                if (valid) {
                    // 일기 수정 성공 후 메세지
                    this.$message({
                    type: 'info',
                    message: `일기를 수정하였습니다.`
                    });  
                    // 일기 수정을 위해서 index, diary 정보를 넘겨줌
                    this.$store.commit('updateDiary', {
                        index: this.$route.query.index,
                        diary: this.diary
                    })
                    // list로 화면 전환 
                    this.$router.push({ path: '/diary/list'}); 

                } else {
                    this.$message({
                    type: 'info',
                    message: `양식을 확인해주세요.`
                    });  
                    return false;
                    }
                });
            },
            resetForm(formName) {
                // form 초기화 이후 list 화면으로 전환
                this.$refs[formName].resetFields();
                this.$router.push({ path: '/diary/list'}); 
            }
           
        },
        mounted() {
            // type에 따라서 data에 값들을 바인딩 해줌 > type='update'인 경우에만 데이터 바인딩
            let type = this.$route.query.type;
            
            if(this.$route.query.type == 'update') {
                let index = this.$route.query.index;    
                
                let diaryData = this.$store.state.diary[index];
                this.diary.title = diaryData.title;
                this.diary.content = diaryData.content;
                this.diary.emotion = diaryData.emotion;
                this.diary.weather = diaryData.weather;
            }
        }
    }
</script>
<style scoped>
    #write-btn-box {
        margin-top : 20px; 
    }

    .btn-info:first-child {
        margin-right: 5px;
    }

    .write-title {
        margin-bottom : 20px; 
    }
</style>