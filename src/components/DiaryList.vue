<template>
    <!-- 
        # Diary List 컴포넌트
            # 상단: 쓰기 버튼, 검색창, 초기화 버튼
            # 하단: 다이어리 목록 > DiaryCard, DiaryTimeLine 두 개의 컴포넌트를 동적 바인딩 헀습니다. 
    -->
    <el-container>
        <el-main>
        <!-- 컨텐츠 영역 상단 시작 -->
        <el-row>
            <el-col :span="18">
                <el-radio-group v-model="type">
                    <el-radio-button label="TimeLine"><i class="el-icon-document"></i></el-radio-button>
                    <el-radio-button label="Card"><i class="el-icon-menu"></i></el-radio-button>
                </el-radio-group>
                <el-button type="primary" icon="el-icon-edit" circle  @click="goWrite()"></el-button>
            </el-col>

            <el-col :span="6" style="text-align: right;">
                <!-- clearable 속성 추가 -->
                <el-input 
                    placeholder="검색"
                    v-model="search"
                    size="medium"
                    @keyup.enter.native="getDiaryList()"
                    @click.native="test()"
                    clearable
                >
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                </el-input>
            </el-col>
        </el-row>
        <!-- 컨텐츠 영역 상단 끝 -->
        <!-- 컨텐츠 영역 하단 리스트 시작 > 동적 컴포넌트 바인딩 > 검색 결과를 넘겨줘야하기 때문에 diaryList도 prop를 이용해서 넘겨줌 -->
        <keep-alive>
            <component :is="currentComponent" :diaryList="this.diaryList"></component>
            </keep-alive>  
        <!-- 컨텐츠 영역 하단 리스트 끝 -->
        </el-main>
    </el-container>
</template>
<script>
    import { mapState } from 'vuex'
    import DiaryTimeLine from './DiaryTimeLine'
    import DiaryCard from './DiaryCard'

    export default {      
        data() {
            return {
                select: '',
                diaryList: this.$store.state.diary,
                search: '',
                // TimeLine을 기본 형태로 설정해둠
                type: 'TimeLine'
            }
        },
        methods: {
            // 일기 작성 화면으로 전환
            goWrite() {
                this.$router.push({ 
                    path: '/diary/write',
                    query: {
                        type: 'write'
                    }
                }).catch(() => {}); 
            },
            // 일기 리스트에서 삭제
            deleteDiary(index, event) {
                this.$store.commit('deleteDiary', {
                    index: index
                })                
            },
            // 검색
            getDiaryList() {
                // 한번 검색 한 뒤 다시 검색했을 때 방지
                this.diaryList = this.$store.state.diary; 
                // filter, includes 메소드 이용
                this.diaryList = this.diaryList.filter(diary => {
                    return (diary.title.toLowerCase().includes(this.search.toLowerCase()))
                })
            }
        },
        computed: {
            /* 
                # 일기 목록 보기 형식 변경 
                    type이 TimeLine 또는 Card인 경우에 따라서 다른 컴포넌트를 보여줌
            */
            currentComponent() {
                return 'Diary' + this.type;
            }
        },
        components: {
            DiaryTimeLine,
            DiaryCard
        }
    }
</script>
<style scoped>
    /* 해당 컴포넌트에서만 사용하고 있는 style이어서 css scopped 설정 해줌 */
    .diary-date {
        color: gray;
        margin-right: 10px;
    }

    .diary-delete {
        float: right;
        padding-left : 10px; 
        border: 0px;
        background-color: transparent;
    }

</style>