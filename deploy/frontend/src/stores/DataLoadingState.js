import { makeObservable, observable, computed, action } from "mobx";

const loadingStatus = {
    SUCCESS: 0,
    ERROR: 1,
    LOADING: 2,
};

export class DataLoadingState {
    state = loadingStatus.SUCCESS;

    constructor() {
        makeObservable(this, {
            state: observable,
            isLoading: computed,
            isSuccess: computed,
            isError: computed,
            isLoadFinished: computed,
            setState: action,
        });
    }

    get isLoading() {
        return this.state === loadingStatus.LOADING;
    }

    get isSuccess() {
        return this.state === loadingStatus.SUCCESS;
    }

    get isError() {
        return this.state === loadingStatus.ERROR;
    }

    get isLoadFinished() {
        return !this.isLoading;
    }

    setState = (state) => {
        this.state = state;
    };

    success = () => {
        this.setState(loadingStatus.SUCCESS);
    };

    error = () => {
        this.setState(loadingStatus.ERROR);
    };

    loading = () => {
        this.setState(loadingStatus.LOADING);
    };
}
