import { Routes, Route } from "react-router-dom";
import { Home, Login, Homepage } from "./containers/Screens";
import { path } from "./ultils/constant";
import { System } from "./containers/Systems";
import { AuthProvider } from "./api/AuthApi";
import DetailPost from "./containers/Screens/DetailPost/DetailPost";
import CreatePost from "./containers/Systems/CreatePost/CreatePost";
import UserDetail from "./containers/Systems/UserDetail";
import ManagePostOfUser from "./containers/Systems/ManagePostOfUser";
import LikePostManager from "./containers/Systems/LikePostManager";
import ItemLikePost from "./components/ItemLikePost";
import { LikePostContext } from "./api/likePostContext";
import { useState } from "react";
// import Homepage from "./containers/Screens/Homepage";
function App() {
  const [likedPosts, setLikedPosts] = useState([]);
  // const { currentUser } = useContext(AuthContext);
  return (
    <AuthProvider>
      <LikePostContext.Provider value={[likedPosts, setLikedPosts]}>

        <div className="justify-center flex">
          <Routes>
            <Route path={path.HOME} element={<Home />}>
              <Route path="*" element={<Homepage />} />
              <Route path={path.LOGIN} element={<Login />} />
              <Route
                path={path.DETAIL_POST_TITLE_POSTID}
                element={<DetailPost />}
              />
            </Route>
            <Route path={path.SYSTEM} element={<System />}>
              <Route path={path.CREATE_POST} element={<CreatePost />} />
              <Route path={path.INFOR_USER} element={<UserDetail />} />
              <Route path={path.MANAGE_POST} element={<ManagePostOfUser />} />
              <Route path={path.MANAGE_LIKE_POST} element={<LikePostManager />} />
            </Route>
          </Routes>
        </div>
      </LikePostContext.Provider>

    </AuthProvider>
  );
}
export default App;
