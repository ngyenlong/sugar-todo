import {store} from '../common/constant'
export function saveData (data) {
    localStorage.setItem(store.TODO_LIST, JSON.stringify(data));
}

export function getData () {
    return JSON.parse(localStorage.getItem(store.TODO_LIST)) || [];
}