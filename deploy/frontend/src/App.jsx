import { BrowserRouter } from "react-router-dom";
import { Router } from "./routes/index";
import { ConfigProvider, Flex, Layout } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { Footer, Header } from "antd/es/layout/layout";
import { userStore } from "#stores/UserStore.js";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";

export const App = observer(() => {
    const {isAuth, userFullName} = userStore;

    const logOut = () => {
        userStore.logOut();
    };

    useEffect(() => {
        userStore.checkServer();
        userStore.authenticateUser();
      }, []);

    return (
        <BrowserRouter>
            <ConfigProvider
                theme={{
                    token: {
                        colorBgContainerDisabled: "#f0f0f0",
                        colorTextDisabled: "black",
                    },
                }}
            >
                <Layout style={{ minHeight: "100vh" }}>
                    <Header
                        style={{
                            position: "sticky",
                            top: 0,
                            zIndex: 1,
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end",
                            height: "70px",
                            backgroundColor: "white",
                        }}
                    >
            {isAuth && (
              <Flex gap={10}>
                <p>{userFullName ?? ''}</p>
                <div className="demo-logo">
                  <LogoutOutlined
                    title="Выйти"
                    onClick={logOut}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </Flex>
            )}

                    </Header>
                    <Layout
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <div className="App">
                            <Router />
                        </div>
                    </Layout>
                    <Footer style={{ textAlign: "center" }}>
                        Nice to met ya ©{new Date().getFullYear()} Created by{" "}
                        <a
                            href="https://abdulovdb-com.vercel.app"
                            rel="noreferrer"
                            target="_blank"
                        >
                            AbdulovDB
                        </a>
                    </Footer>
                </Layout>
            </ConfigProvider>
        </BrowserRouter>
    );
});
