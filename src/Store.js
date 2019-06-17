import { createStore } from 'redux';
import { Reducer } from './reducers/user';

export const Store = createStore(Reducer, {
    user: null
})
