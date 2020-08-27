<template>
    <!-- 
        # DiaryTimeLine 컴포넌트
            타임라인 형식 다이어리 리스트를 보여주는 컴포넌트
    --> 
    <div class="contents">
        <!-- el-timeline 태그 이용 -->
        <el-timeline 
            :reverse="true"
        >
            <el-timeline-item
                v-for="(diary, index) in diaryList"
                :key="index"
                :timestamp="diary.date"
                placement="top">
                <el-card  @click.native="viewDiary(index)">
                    <el-row class="diary-title">
                        {{diary.title}}
                    </el-row>
                    <el-row class="diary-date">
                        {{diary.date}} 작성
                    </el-row>
                </el-card>
            </el-timeline-item>
        </el-timeline>
    </div>
</template>
<script>
    export default {
        data() {
            return {
            }
        },
        props: 
            ['diaryList']
        ,
        methods: {
            // 일기 상세하게 보기 
            viewDiary(i) {
                this.$router.push({ 
                    path: '/diary/' + i,
                    params: {
                        index:i
                    }
                }).catch(() => {}); 
            }
        }
    }
</script>
<style scoped>
    .contents {
        /* 스크롤 */
        overflow-y: scroll;
        height: 70vh;
        -top: 10px;
    }

    .diary-title {
        color:#303133;
        margin-bottom: 5px;
    }

    .diary-date {
        color: #909399;
        font-size: 0.7rem;
    }
</style>