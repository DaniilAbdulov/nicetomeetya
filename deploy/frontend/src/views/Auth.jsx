import React from "react";
import { observer } from "mobx-react-lite";
import { Card, Flex } from "antd";
import { userStore } from "../stores/UserStore.js";
import { NavLink } from "react-router-dom";
import "./Home.scss";
import { AuthForm } from "#components/AuthForm/index.jsx";

export const Auth = observer(() => {
    console.log(userStore);

    return (
        <Card className="content">
            <Flex wrap="wrap" gap="small">
                <AuthForm />
            </Flex>
        </Card>
    );
});
