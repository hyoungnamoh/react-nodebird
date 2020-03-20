import {all, call, fork} from 'redux-saga/effects';
import user from './user';
import post from './post';
import axios from "axios";
axios.defaults.baseURL = 'http://localhost:8088/api';

export default function* rootSaga() {
    yield all([
        fork(user),
        fork(post),
    ]);
}