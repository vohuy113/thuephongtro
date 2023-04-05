import { Routes, Route } from "react-router-dom";
import { Home, Login, Homepage } from "./containers/Screens";
import { path } from "./ultils/constant";
import { System } from "./containers/Systems";
import { AuthProvider } from "./api/AuthApi";
import DetailPost from "./containers/Screens/DetailPost/DetailPost";
import CreatePost from "./containers/Systems/CreatePost/CreatePost";
// import Homepage from "./containers/Screens/Homepage";
function App() {
  // const { currentUser } = useContext(AuthContext);
  return (
    <AuthProvider>
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
          </Route>
        </Routes>
      </div>
    </AuthProvider>
  );
}
export default App;
