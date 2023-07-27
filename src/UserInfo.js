import { useContext, useState } from "react";
import { AuthContext } from "./auth";

const FormDisplay = ({ displayName, user }) => {
  const [display, setDisplay] = useState(displayName);

  const changeName = (e) => setDisplay(e.target.value);

  const save = () => {
    if (display !== "") {
      user.updateProfile({ displayName: display });
    }
  };

  return (
    <>
      <div className=" p-32 absolute top-1/2 left-1/2 w-1/3 -translate-x-1/2 -translate-y-1/2 bg-gray-50 border  flex flex-col mt-6">
        <label className="font-semibold">Altere seu nome</label>
        <input
          className=" bg-gray-100 border border-gray-200 "
          type="text"
          name="displayName"
          value={display}
          onChange={changeName}
        />
        <button
          onClick={save}
          className="uppercase mt-12 font-semibold text-orange-600"
        >
          Salvar
        </button>
      </div>
    </>
  );
};

const UserInfo = () => {
  const auth = useContext(AuthContext);
  const [changeNameStatus, setChangeNameStatus] = useState(false);

  if (auth.user === null) {
    return null;
  }

  const { displayName, email } = auth.user;
  const [alternativeDisplayName] = email.split("@");
  const dn = displayName || alternativeDisplayName;

  return (
    <>
      <div className=" flex gap-3 items-center">
        <p>Olá {dn}</p>
        <button
          className="bg-orange-600 text-white py-1 px-3"
          onClick={auth.signout}
        >
          Sair
        </button>
        <button
          className="bg-gray-200 text-gray-700 py-1 px-3"
          onClick={() => setChangeNameStatus(!changeNameStatus)}
        >
          Alterar nome
        </button>
      </div>
      {changeNameStatus && <FormDisplay displayName={dn} user={auth.user} />}
    </>
  );
};

export default UserInfo;
