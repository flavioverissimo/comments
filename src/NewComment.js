import { useContext, useState } from "react";
import firebase from "./firebase";
import { useDatabasePush } from "./database";
import { AuthContext } from "./auth";

const NewComment = () => {
  const [, save] = useDatabasePush("comments");
  const [newComment, setNewComment] = useState("");
  const auth = useContext(AuthContext);

  if (auth.user === null) {
    return null;
  }

  const { displayName, uid, email } = auth.user;
  const [alternativeDisplayName] = email.split("@");

  const getComment = (e) => setNewComment(e.target.value);

  const saveComment = () => {
    if (newComment !== "") {
      save({
        content: newComment,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
        user: {
          id: uid,
          name: displayName || alternativeDisplayName,
        },
      });
      setNewComment("");
    }
  };

  return (
    <div className="pt-12 flex gap-12">
      <div className="flex-1">
        <h3 className=" text-xl mb-2">Inserir novo comentário</h3>
        <p className="text-sm">
          O seu comentário é muitos importante para nossos clientes. Por
          gentileza, nos dê sua avaliação com sinceridade, pois seu feedback é
          muito importante para melhorar nossa empresa.
        </p>
      </div>
      <textarea
        onChange={getComment}
        value={newComment}
        className=" bg-gray-50 border border-gray-300 flex-1"
        cols={50}
        rows={4}
      ></textarea>

      <button
        className="bg-orange-600 px-6 text-white font-bold"
        onClick={saveComment}
      >
        Comentar
      </button>
    </div>
  );
};

export default NewComment;
