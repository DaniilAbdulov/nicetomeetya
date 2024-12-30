import React from "react";
import { CarouselView } from "./CarouselView";
import { MyDrawer } from "#components/shared/MyDrawer.jsx";
import { observer } from "mobx-react-lite";
import { carouselStore } from "#stores/components/Carousel/CarouselStore.js";

export const CarouselWrapper = observer(() => {
    const users = carouselStore.users;

    return (
        <div style={{display:'flex', flexDirection: 'column'}}>
        <CarouselView users={users} />
        <MyDrawer buttonName='Смотреть логи'/>
        </div>
    )
});
