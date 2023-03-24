import { Routes, Route } from "react-router-dom";
import { Home, Login } from "./containers/Public";
import { path } from "./ultils/constant";

import { getDatabase, ref, child, get } from "firebase/database";
import database from "./firebase";
function App() {
  // realtime database firebase
  // const dbRef = ref(database);

  // get(child(dbRef, `Users/aZTfWjnkx8Rl7ZHujbpj31HtYe52`))
  //   .then((snapshot) => {
  //     if (snapshot.exists()) {
  //       console.log(typeof snapshot.val().age);
  //     } else {
  //       console.log("No data available");
  //     }
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });
  return (
    <div className="h-screen w-screen bg-primary">
      <Routes>
        <Route path={path.HOME} element={<Home />}>
          <Route path={path.LOGIN} element={<Login />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
