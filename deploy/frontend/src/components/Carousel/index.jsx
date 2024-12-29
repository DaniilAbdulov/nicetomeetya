import React from "react";
import { carouselStore } from "#stores/components/Carousel/CarouselStore";
import { CarouselView } from "./CarouselView";

export const CarouselWrapper = () => {
    return <CarouselView store={carouselStore} />;
};
