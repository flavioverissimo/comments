import { useContext, useState } from "react";
import { AuthContext } from "./auth";

const CreateUser = () => {
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

  const newUser = () => {
    const email = formData.email;
    const password = formData.password;
    if (email.includes("@") && email.length > 8 && password.length >= 8) {
      auth.createUser.createUser(email, password);
    }
  };

  return (
    <>
      <div>
        {auth.createUser.createUserState.error !== "" && (
          <p>{auth.createUser.createUserState.error}</p>
        )}
        {auth.user === null && (
          <div className="bg-gray-200 p-10 flex flex-col gap-3">
            <h4 className="text-lg font-semibold text-center">
              Create new user
            </h4>
            <div className="flex flex-col">
              <label htmlFor="email">Email</label>
              <input
                className="bg-gray-100 border border-gray-50"
                id="email"
                type="text"
                name="email"
                value={formData.email}
                onChange={setData}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password">Password</label>
              <input
                className="bg-gray-100 border border-gray-50"
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={setData}
              />
            </div>
            <button
              className="bg-orange-600 w-full font-medium text-white py-2 mt-2"
              onClick={newUser}
            >
              Create
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CreateUser;
