import { autorun, makeAutoObservable } from "mobx";

class CarouselStore {
    constructor() {
        makeAutoObservable(this);
        autorun(() => this.getUsers());
    }

    getUsers = () => {
        //
    };
}

export const carouselStore = new CarouselStore();
