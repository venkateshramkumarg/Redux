import React from "react";
import { useSelector,useDispatch} from "react-redux";

const PostAuthor = ({userId}) => {
    const users=useSelector((state)=>state.users.users);
    const user=users.find((user)=>user.id==userId);

  return <div>By {user?user.name:"Unkown User"}</div>;
};

export default PostAuthor;
