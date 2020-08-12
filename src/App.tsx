import React from "react";
import Header from "./components/SiteFrame/Header/Header";
import Main from "./components/SiteFrame/Main/Main";
import Routes from "./components/Routes";

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Main>
        <Routes />
      </Main>
    </>
  );
};

export default App;
