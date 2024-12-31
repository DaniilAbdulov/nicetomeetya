import {USERS_API_URL} from "#config.js";
import { getFullName } from "#utils/getFullName.js";
import { autorun, makeAutoObservable } from "mobx";
import { DataLoadingState } from "#stores/DataLoadingState.js";

class CarouselStore {
    isLoading = false;
    users = [];
    dataLoadingState;

    constructor() {
        makeAutoObservable(this);
        this.dataLoadingState = new DataLoadingState();
        autorun(() => this.getUsers());
    }

    formatUsers = (users) => users.map((user) => {
        const {first_name, last_name, middle_name} = user || {};
        return {
            ...user,
            full_name: getFullName(first_name, last_name, middle_name)
        }
    })

    setUsers = (users) => {
        this.users = users;
    }

    getUsers = async() => {
        this.dataLoadingState.loading();

        try {
            const response = await fetch(`${USERS_API_URL}/users`);
            const {result} = await response.json();
            const formattedUsers = result?.length ? this.formatUsers(result) : [];

            this.setUsers(formattedUsers);

            this.dataLoadingState.success();
            return;
        } catch (_) {
            this.setUsers([])
            this.dataLoadingState.error();
        }
    };
}

export const carouselStore = new CarouselStore();
