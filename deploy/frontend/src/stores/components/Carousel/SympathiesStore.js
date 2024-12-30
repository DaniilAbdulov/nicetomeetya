import {SYMPATHIES_API_URL, USERS_API_URL} from "#config.js";
import axios from "axios";
import { autorun, makeAutoObservable } from "mobx";
import {userStore} from '../../UserStore.js'

class SympathiesStore {
    isLoading = false;
    sympathies = [];
    userStore;

    constructor() {
        makeAutoObservable(this);
        this.userStore = userStore;
        autorun(() => this.getSympathies());
    }

    formatSympathies = (res) => res.map(({to_user_id}) => to_user_id);

    setSympathies = (sympathies) => {
        this.sympathies = sympathies;
    }

    getSympathies = async() => {
        this.isLoading = true;

        try {
            const {data: {data}} = await axios.get(`${SYMPATHIES_API_URL}/`, {
                params: { from_user_id: this.userStore.userId }
              }) || {};
              console.log(data);
            const formattedData = this.formatSympathies(data);
            this.setSympathies(formattedData);

            this.isLoading = false;
            return;
        } catch (error) {
            console.log(error)
            this.setSympathies([])
            this.isLoading = false;
            this.errorMessage = error.response?.data.message;
        }
    };

    createSympathy = async(id) => {
        this.isLoading = true;

        try {
            const res = await axios.post(`${SYMPATHIES_API_URL}/create`, {from_user_id: this.userStore.userId, to_user_id: id});
            console.log(res);
            this.isLoading = false;
            return;
        } catch (error) {
            this.isLoading = false;
            this.errorMessage = error.response?.data.message;
        }
    }
}

export const sympathiesStore = new SympathiesStore();
