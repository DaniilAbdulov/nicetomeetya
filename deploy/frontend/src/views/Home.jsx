import React from "react";
import { observer } from "mobx-react-lite";
import { Card, Flex } from "antd";
import "./Home.scss";
import { CarouselWrapper } from "#components/Carousel/index.jsx";

export const Home = observer(() => {
    return (
        <Card className="content">
            <Flex wrap="wrap" gap="small">
                <CarouselWrapper />
            </Flex>
        </Card>
    );
});
