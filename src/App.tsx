import React, { useCallback, useEffect } from "react";
import Header from "./components/SiteFrame/Header/Header";
import Main from "./components/SiteFrame/Main/Main";
import Routes from "./components/Routes";
import { getTokenFromStorage } from "./api/helpers";
import { setCurrentUser } from "./reducers/currentUser";
import { getUserByToken } from "./api/users";
import { useDispatch } from "react-redux";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const fetchStoredUser = useCallback(async () => {
    const token = getTokenFromStorage();
    if (token) {
      const result = await getUserByToken(token);
      if ("user" in result) {
        dispatch(
          setCurrentUser({
            firstName: result.user.first_name,
            lastName: result.user.last_name,
            email: result.user.email,
            username: result.user.username,
            token: result.user.token,
            isAdmin: result.user.is_admin,
          }),
        );
      }
    }
  }, [dispatch]);

  useEffect(() => {
    fetchStoredUser();
  }, [fetchStoredUser]);

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
