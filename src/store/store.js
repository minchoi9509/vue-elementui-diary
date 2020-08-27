import Vue from "vue";
import Vuex from "vuex"

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        user: '',
        diary: []
    },
    mutations: {
        // 로그인
        login: (state, payload) => {
            state.user = payload.user
        },
        // 로그아웃 사용자 정보 없애기
        logout: (state) => {
            state.user = '';
        },
        // 일기 저장
        writeDiary: (state, payload) => {
            state.diary.push(payload.diary); 
        },
        // 일기 수정
        updateDiary: (state, payload) => {
            state.diary[payload.index] = payload.diary;
        },
        // 일기 삭제 
        deleteDiary: (state, payload) => {
            state.diary.splice(payload.index, 1);
        }
    }
});