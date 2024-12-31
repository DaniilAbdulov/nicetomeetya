import { makeAutoObservable } from "mobx";
import { USERS_API_URL } from "../config.js";
import { getFullName } from "#utils/getFullName.js";
import { DataLoadingState } from "./DataLoadingState.js";

class UserStore {
    isAuth = false;
    successMessage = "";
    errorMessage = "";
    user = null;
    isPremium = false;
    candidat = null;
    loadingState;

    constructor() {
        this.loadingState = new DataLoadingState();
        makeAutoObservable(this);
    }

    get userFullName() {
        const { first_name, last_name, middle_name } = this.user || {};

        return getFullName(first_name, last_name, middle_name);
    }

    get userId() {
        return this.user?.id ?? null;
    }

    clearMessage() {
        if (this.successMessage) {
            this.successMessage = "";
        } else if (this.errorMessage) {
            this.errorMessage = "";
        }
    }

    logOut() {
        this.isAuth = false;
        this.user = null;
        localStorage.removeItem("bgtrackerjwt");
    }

    setUser = (user) => {
        this.isAuth = true;
        this.isPremium = false;
        this.user = user;
    };

    get headers() {
        const {token} = this;
        const headers = new Headers();
        
        if (token) {
            headers.append("Authorization", `Bearer ${token}`);
        }
        
        return headers;
    };

    get token() {
        return localStorage.getItem("bgtrackerjwt");
    }

    setToken = (token) => {
        localStorage.setItem("bgtrackerjwt", token);
    }

    async authenticateUser() {
        this.loadingState.loading();
        const {headers} = this;

        try {
            const response = await fetch(`${USERS_API_URL}/auth`, {headers});
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const { user } = (await response.json()) || {};

            this.setUser(user);
            this.loadingState.success();

            return;
        } catch (error) {
            console.error('Fetch error:', error);
            this.loadingState.error();
        }
    }

    async checkServer() {
        try {
            await fetch(`${USERS_API_URL}/checkServer`);

            return;
        } catch (error) {
            console.log(error.message);
        }
    }

    async loginUser(candidat) {
        this.loadingState.loading();

        const { login, password } = candidat || {};

        if (!login || !password) {
            return;
        }

        try {
            const response = await fetch(`${USERS_API_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
                body: JSON.stringify(candidat),
            });

            if (!response.ok) {
                throw new Error("response is not ok");
            }

            const { token, user } = (await response.json()) || {};

            this.setUser(user);
            this.setToken(token);

            this.loadingState.success();

            return;
        } catch (error) {
            this.loadingState.error();
            console.log(error);
        }
    }
}

export const userStore = new UserStore();
