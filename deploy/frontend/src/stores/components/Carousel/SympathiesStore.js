import {SYMPATHIES_API_URL} from "#config.js";
import axios from "axios";
import { autorun, makeAutoObservable } from "mobx";
import {userStore} from '../../UserStore.js'
import { getFullName } from "#utils/getFullName.js";
import { getFormattedDate } from "#utils/getFormattedDate.js";

class SympathiesStore {
    isLoading = false;
    sympathies = [];
    userStore;

    constructor() {
        makeAutoObservable(this);
        this.userStore = userStore;
        autorun(() => this.getSympathies());
    }

    get sympathiesByUser() {
        return this.sympathies.map(({to_user_id}) => to_user_id);
    }

    get sympathiesForDrawer() {
        const {sympathies} = this;

        if (!sympathies?.length) {
            return [];
        }

        const {userId} = this.userStore;

        return sympathies.reduce((acc, item) => {
            const {userFromInfo, userToInfo, created_at, to_user_id} = item || {};

            if (userId === to_user_id) {
                acc.push(
                    {
                        from: {
                            fullName: getFullName(userFromInfo.first_name, userFromInfo.last_name, userFromInfo.middle_name)
                        },
                        to: {
                            fullName: getFullName(userToInfo.first_name, userToInfo.last_name, userToInfo.middle_name)
                        },
                        time: getFormattedDate(created_at)
                    }
                )
            }
          
            return acc;
        }, []);
    }

    setSympathies = (sympathies) => {
        this.sympathies = sympathies;
    }

    getSympathies = async() => {
        this.isLoading = true;
        console.log(`getSympathies`)
        try {
            const {data: {data}} = await axios.get(`${SYMPATHIES_API_URL}/`, {
                params: { from_user_id: this.userStore.userId }
              }) || {};


            if (data?.length) {
              this.setSympathies(data);
            }

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
