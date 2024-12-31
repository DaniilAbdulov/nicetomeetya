import {SYMPATHIES_API_URL} from "#config.js";
import { autorun, makeAutoObservable } from "mobx";
import {userStore} from '../../UserStore.js'
import { getFullName } from "#utils/getFullName.js";
import { getFormattedDate } from "#utils/getFormattedDate.js";
import { DataLoadingState } from "#stores/DataLoadingState.js";

class SympathiesStore {
    isLoading = false;
    sympathies = [];
    userStore;
    dataLoadingState;

    constructor() {
        makeAutoObservable(this);
        this.userStore = userStore;
        this.dataLoadingState = new DataLoadingState();
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
        this.dataLoadingState.loading();

        const from_user_id = this.userStore.userId;

        if (!from_user_id) {
            return;
        }

        try {
            const queryString = new URLSearchParams({
                from_user_id,
            }).toString();

            const response = await fetch(`${SYMPATHIES_API_URL}/?${queryString}`);
            
            if (response.ok) {
                const {data} = await response.json();

                this.setSympathies(data);
            }

            this.dataLoadingState.success();
            return;
        } catch (_) {
            this.setSympathies([])
            this.dataLoadingState.error();
        }
    };

    createSympathy = async(id) => {
        this.dataLoadingState.loading();

        try {
            await fetch(`${SYMPATHIES_API_URL}/create`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json;charset=utf-8",
                            },
                            body: JSON.stringify({
                                from_user_id: this.userStore.userId, to_user_id: id
                            }),
                        });

                        this.dataLoadingState.success();
            return;
        } catch (_) {
            this.dataLoadingState.error();
        }
    }
}

export const sympathiesStore = new SympathiesStore();
