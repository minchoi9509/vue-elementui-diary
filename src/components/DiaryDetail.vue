<template>
    <!-- 
        # DiaryDetail 컴포넌트
            # 상단: 제목, 날짜, 뒤로가기/삭제 버튼
            # 하단: Diary 내용
    -->
    <el-container>
        <el-main>
        <!-- 컨텐츠 영역 상단 시작 -->
        <el-header id="detail-header">
            <el-row class="detail-date">
                {{ diary[index].date }}
            </el-row>
            <el-row>
                <el-col :xl="20" :sm="15">
                    <span class="detail-title">
                        {{ diary[index].title }}
                    </span>
                    <!-- string형으로 받았던 기분 data를 icon형으로 만들어주기 위해서 바인딩 -->
                    <span class="detail-etc">
                        ( <i :class="weather"></i> {{ diary[index].emotion }} )
                    </span>
                </el-col>
                <el-col :xl="4" :sm="8">
                    <!-- 일기 삭제 버튼 -->
                    <el-button size="small" icon="el-icon-back" circle @click="goBack()"></el-button>
                    <el-button size="small" type="primary" icon="el-icon-edit" circle @click="goUpdate()"></el-button>
                    <el-button size="small" type="info" icon="el-icon-delete" circle @click="deleteDiary()"></el-button>
                </el-col>
            </el-row>
        </el-header>
        <!-- 컨텐츠 영역 상단 끝 -->
        <!-- 컨텐츠 영역 하단 시작 -->
        <div id="detail-content">
            <el-container>
                <pre>{{ diary[index].content }}</pre>
            </el-container>
        </div>
        <!-- 컨텐츠 영역 상단 끝 -->
        </el-main>
    </el-container>
</template>
<script>
    export default {
        data() {
            return {
                // DiaryList에서 라우터를 통해 넘겨준 params를 indenx를 통해 받음  
                diary : this.$store.state.diary,
                index : this.$route.params.index         
            }
        },
        computed: {
            // 날씨 값에 따른 아이콘 바인딩
            weather() {
                let weather = this.diary[this.index].weather;
                return 'el-icon-' + weather;
            }
        },
        methods: {
            // index를 이용해서 일기 삭제 이후 목록으로 돌아감
            deleteDiary() {
                this.$store.commit('deleteDiary', {
                    index: this.index
                })  
                this.$router.push({ path: '/diary/list'});  
            },
            // go() 메소드를 이용해서 이전 화면으로 돌아감 
            goBack() {
                this.$router.go(-1);
            },
            // 수정화면으로 이동, query에 type="update"를 줘서 구분함
            goUpdate() {
                this.$router.push({ 
                    path: '/diary/write',
                    query: {
                        type: 'update',
                        index: this.index
                    }}).catch(() => {}); 
            }
        }
    }
</script>
<style scoped>

    .detail-title {
        font-weight: bold;
        font-size: 1.5rem;
        padding-right: 13px;
        color: #303133;
    }
    
    .detail-date{
        color: #606266;
        font-size: 0.9rem;
    }

    .detail-etc  {
        color: #909399;
        font-size: 0.8rem;
    }
    #detail-content {
        padding: 30px; 
        font-size: 1.2rem;
    }
</style>