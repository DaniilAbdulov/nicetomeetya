import { Routes, Route, useNavigate } from "react-router-dom";
import { Auth, NoFound } from "../views/index";
import { observer } from "mobx-react-lite";
import { userStore } from "#stores/UserStore.js";
import { useEffect } from "react";
import { CarouselWrapper } from "#components/Carousel/index.jsx";

export const Router = observer(() => {
    const isAuth = userStore.isAuth;

    const navigate = useNavigate();

    useEffect(() => {
        if (isAuth) {
            navigate("/home");
        } else {
            navigate("/");
        }
    }, [navigate, isAuth]);

    return (
        <div>
            <Routes>
                <Route path="/" element={<Auth />} />
                <Route path="/home" element={<CarouselWrapper />} />
                <Route path="*" element={<NoFound />} />
            </Routes>
        </div>
    );
});
