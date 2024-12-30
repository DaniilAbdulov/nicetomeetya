import React from "react";
import { CarouselView } from "./CarouselView";
import { MyDrawer } from "#components/shared/MyDrawer.jsx";

export const CarouselWrapper = () => (
    <div style={{display:'flex', flexDirection: 'column'}}>
    <CarouselView />
    <MyDrawer buttonName='Смотреть логи'/>
    </div>
) ;
