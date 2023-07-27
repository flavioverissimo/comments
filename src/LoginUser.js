import { useContext, useState } from "react";
import { AuthContext } from "./auth";

const LoginUser = () => {
  const auth = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const setData = (evt) => {
    setFormData((old) => {
      return {
        ...old,
        [evt.target.name]: evt.target.value,
      };
    });
  };

  const loginUser = () => {
    const email = formData.email;
    const password = formData.password;
    if (email.includes("@") && email.length > 8 && password.length >= 8) {
      auth.accessUser.accessUser(email, password);
    }
  };

  return (
    <>
      <div>
        {auth.user === null && (
          <div className="  flex items-center gap-3">
            <div className="flex flex-col">
              <input
                className="bg-gray-100 border border-gray-50 px-3 rounded-lg"
                id="email"
                type="text"
                name="email"
                value={formData.email}
                onChange={setData}
                placeholder="email"
              />
            </div>
            <div className="flex flex-col">
              <input
                className="bg-gray-100 border border-gray-50 px-3 rounded-lg"
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={setData}
                placeholder="password"
              />
            </div>
            <button
              className=" w-full font-medium text-orange-600 uppercase text-xs py-2 px-3"
              onClick={loginUser}
            >
              Login
            </button>
          </div>
        )}

        {auth.accessUser.accessUserState.error !== "" &&
          (auth.accessUser.accessUserState.error ===
            "The password is invalid or the user does not have a password." ||
            auth.accessUser.accessUserState.error ===
              "There is no user record corresponding to this identifier. The user may have been deleted.") && (
            <p className="text-xs ml-2 text-red-600">
              Usuário ou senha inválido
            </p>
          )}
      </div>
    </>
  );
};

export default LoginUser;
