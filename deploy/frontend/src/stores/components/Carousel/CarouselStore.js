import {USERS_API_URL} from "#config.js";
import axios from "axios";
import { autorun, makeAutoObservable } from "mobx";

class CarouselStore {
    isLoading = false;
    users = [];

    constructor() {
        makeAutoObservable(this);
        autorun(() => this.getUsers());
    }

    formatUsers = (users) => users.map((user) => {
        return {
            ...user,
            full_name: `${user.last_name} ${user.first_name} ${user.middle_name}`
        }
    })

    setUsers = (users) => {
        this.users = users;
    }

    getUsers = async() => {
        this.isLoading = true;

        try {
            const {data: {result}} = await axios.get(`${USERS_API_URL}/users`) || {};
            const formattedUsers = result?.length ? this.formatUsers(result) : [];

            this.setUsers(formattedUsers);

            this.isLoading = false;
            return;
        } catch (error) {
            this.setUsers([])
            this.isLoading = false;
            this.errorMessage = error.response?.data.message;
        }
    };
}

export const carouselStore = new CarouselStore();
