import React from "react";
import { CarouselView } from "./CarouselView";
import { MyDrawer } from "#components/shared/MyDrawer.jsx";
import { observer } from "mobx-react-lite";
import { carouselStore } from "#stores/components/Carousel/CarouselStore.js";
import { sympathiesStore } from '#stores/components/Carousel/SympathiesStore.js';

export const CarouselWrapper = observer(() => {
    const users = carouselStore.users;
    const elements = sympathiesStore.sympathiesForDrawer;

    const isLoading = carouselStore.isLoading || sympathiesStore.isLoading;

    return (
        <div style={{display:'flex', flexDirection: 'column'}}>
         {isLoading ? <p>{'Loading'}</p> : (
        <><CarouselView users={users} /><MyDrawer buttonName='Смотреть логи' elements={elements} /></>
         )}

        </div>
    )
});
