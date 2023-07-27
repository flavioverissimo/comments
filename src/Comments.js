import { useDatabaseGet } from "./database";
import Comment from "./Comment";

const Comments = () => {
  const data = useDatabaseGet("comments");

  if (!data) {
    return <p>Nenhum comentário enviado até o momento</p>;
  }

  const ids = Object.keys(data);
  if (ids.length === 0) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <h2 className="text-3xl py-6 font-semibold">Todos os comentários</h2>
      <div className=" flex flex-wrap gap-12 mb-12">
        {ids.map((id) => {
          return <Comment key={id} comment={data[id]} />;
        })}
      </div>
    </div>
  );
};

export default Comments;
