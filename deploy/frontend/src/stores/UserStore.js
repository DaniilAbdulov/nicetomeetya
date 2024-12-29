import axios from "axios";
import { makeAutoObservable } from "mobx";
import { API_URL } from "../config.js";

class UserStore {
    isAuth = false;
    isLoading = false;
    isFetchingTokenLoading = false;
    successMessage = "";
    errorMessage = "";
    user = null;
    isPremium = false;
    candidat = null;

    constructor() {
        makeAutoObservable(this);
    }

    get userFullName() {
        return `${this.user?.last_name} ${this.user?.first_name}`
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
        this.initializeAxiosHeaders(null);
    }

    setUser = (user) => {
        this.isAuth = true;
        this.isPremium = false;
        this.user = user;
    }

    initializeAxiosHeaders = (token) => {
        if (token) {
            axios.defaults.headers.common.Authorization = `Bearer ${token}`;
        } else {
            delete axios.defaults.headers.common.Authorization;
        }
    }

    async authenticateUser() {
        const token = localStorage.getItem("bgtrackerjwt");
        this.initializeAxiosHeaders(token);

        if (token) {
            try {
                this.isFetchingTokenLoading = true;
                const res = await axios.get(`${API_URL}/auth`);
                this.setUser(res.data.user);
                this.isFetchingTokenLoading = false;
                return res.data;
            } catch (error) {
                this.isFetchingTokenLoading = false;
                console.log(error.message);
            }
        }
    }

    async checkServer() {
        try {
            await axios.get(`${API_URL}/checkServer`);

            return;
        } catch (error) {
            console.log(error.message);
        }
    }

    async loginUser(candidat) {
        this.isLoading = true;

        const {login, password} = candidat || {};

        if (!login || !password) {
            return;
        }

        try {

            const res = await axios.post(`${API_URL}/auth/login`, candidat);

            this.setUser(res.data.user);

            const token = res.data.token;


            localStorage.setItem("bgtrackerjwt", token);
            this.initializeAxiosHeaders(token);
            this.successMessage = "Вход выполнен успешно";
            this.isLoading = false;

            return res.data;
        } catch (error) {
            this.isLoading = false;
            this.errorMessage = error.response?.data.message;
        }
    }
}

export const userStore = new UserStore();
