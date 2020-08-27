<template>
    <!-- 
        # DiaryCard 컴포넌트
            카드 형식 다이어리 리스트를 보여주는 컴포넌트
    -->    
    <div class="card-box">
        <!-- el-card를 이용해서 전체적인 화면 구성 -->
        <el-card 
            v-for="(diary, index) in diaryList" 
            :key="index"
             @click.native.stop="viewDiary(index)"
            :body-style="{ padding: '0px'}"
            @mouseover.native="mouseOver(index)"
            @mouseout.native="mouseOut()"
            class="diary-card"
        >
                <el-row class="row">
                    <el-col :span="23" class="diary-date">
                        {{ dateFormat(diary.date) }}
                    </el-col>
                    <el-col :span="1">
                        <i class="el-icon-circle-close"
                           v-show="select === index"
                           @click.stop="deleteDiary(index)"
                        ></i>                     
                    </el-col>
                </el-row>
                <el-row class="row">
                    {{diary.title}}
                </el-row>             
                <el-row class="row">
                    {{diary.content}}
                </el-row>
        </el-card>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                 select: ''               
            }
        },
        props: [ 'diaryList' ],
        methods: {
            viewDiary(index) {
                this.$router.push({ 
                    path: '/diary/' + index,
                    params: {index : index}
                }).catch(() => {}); 
            },
            mouseOver(index) {
                this.select = index;
            },
            mouseOut() {
                this.select = ''; 
            },
            deleteDiary(index) {
                this.$store.commit('deleteDiary', {
                    index: index
                })
                // 삭제 메시지
                this.$message({
                type: 'info',
                message: `삭제하였습니다.`
                });                
            },
            dateFormat(date) {
                let dateArr = new Array();
                dateArr = date.split(' ');
                return dateArr[0].replace('.','년') + ' ' +
                       dateArr[1].replace('.','월') + ' ' +
                       dateArr[2].replace('.','일');

            }            
        }
    }
</script>
<style scopped>

    /* flexible하게 card 형식이 조정 될 수 있도록 설정 */
    .card-box {
        display: flex;    
        flex-flow: row wrap;    
    }
    .diary-card {
        cursor: pointer;
        display: inline-block;
        flex: 1 1 calc(33% - 20px);
        min-width: 220px;
        max-width: calc(33% - 20px);
        height: 220px;
        margin: 10px;
    }
    .diary-card:hover {
        transition: all 0.5s;
        background-color: #F2F6FC;        
    }
    .el-icon-circle-close{
        font-size: 1.2rem;
    }

    .contents {
        margin-top: 10px;
    }

    /* el-card 안의 css 속성을 위해서 설정 */
    .row {
        padding: 10px 30px;
    }

    .row:first-child {
        font-size: 0.9rem;
        color: #C0C4CC;
    }
    .row:nth-child(2) {
        font-size: 1.1rem;
        color: #303133;
    }

    .row:last-child {
        color: #606266;
        font-size: 0.9rem;
        padding: 10px 40px;
    }

</style>