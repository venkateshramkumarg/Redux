import React from "react";
import { useDispatch} from "react-redux";
import { handleReaction } from "../redux/features/postsSlice";


const ReactionButtons = ({post}) => {
    const dispatch=useDispatch();
    const reactions={
        thumbsUp:'👍',
        hooray:'🎉',
        heart:'❤️',
        rocket:'🚀',
        eyes:'👀'
    }
    const handleChange=({postId,reaction})=>()=>{
        try
        {   
            console.log(postId,reaction);
            dispatch(handleReaction({postId,reaction}));
        }
        catch(error){
            console.error("Failed to handle reaction",error);
        }
    }

    const reactionButtons=Object.entries(reactions).map(([name,emoji])=>{
        return(
            <button key={name} onClick={handleChange({postId:post.id,reaction:name})}>
                {emoji}
                {post.reactions[name]}
            </button>
        );
    });
    
    return <div>{reactionButtons}</div>;
};

export default ReactionButtons;
