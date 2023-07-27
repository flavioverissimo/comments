import Time from "./Time";

const Comment = ({ comment }) => {
  return (
    <div className="bg-gray-100 py-4 px-6">
      <p className="font-bold mb-2">{comment.content}</p>
      <div className=" flex gap-2 text-gray-600 text-sm">
        <p>por: {comment.user.name}</p>
        <Time timestamp={comment.createdAt} />
      </div>
    </div>
  );
};

export default Comment;
