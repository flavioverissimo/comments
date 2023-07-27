import "./App.css";
import NewComment from "./NewComment";
import Comments from "./Comments";
// import CreateUser from "./CreateUser";
import UserInfo from "./UserInfo";
import { AuthProvider } from "./auth";
import LoginUser from "./LoginUser";

function App() {
  return (
    <AuthProvider>
      <div className="container mx-auto">
        <div className=" border-b border-gray-200 flex justify-between items-center py-6">
          <img src="./ComentaAki.png" alt="Comenta Aqui" className="w-32" />
          <LoginUser />
          <UserInfo />
        </div>
        <NewComment />
        <Comments />
        {/* <CreateUser /> */}
      </div>
    </AuthProvider>
  );
}

export default App;
