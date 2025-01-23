import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState={
    posts:[],
    status:"idle",
    error:null
}
export const fetchPosts=createAsyncThunk('posts/fetchPosts',async()=>{
    const response=await fetch('api/posts');
    const data=await response.json();
    return data;
})

export const addNewPost=createAsyncThunk('/posts/addNewPost',async(newPost)=>{
    const response=await fetch('api/posts',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(newPost)
    })
    const data=await response.json();
    return data
})

export const updatePost=createAsyncThunk('/post/updatePost',async({id,title,content})=>{
    await fetch('/api/posts',{
        method:'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({id,title,content})
    })
    return {id,title,content};
})

export const handleReaction=createAsyncThunk('/posts/handleReaction',async({postId,reaction})=>{
    await fetch('/api/posts',{
        method:'PATCH',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({postId,reaction})
    })
    return {postId,reaction}
})

export const deletePost=createAsyncThunk('/posts/deletePost',async(postId)=>{
    await fetch('api/posts',{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({id:postId})
    })
    return postId;
})

const postsSlice=createSlice({
    name:"posts",
    initialState,
    reducers:{
    },
    extraReducers(builder){
        builder
        .addCase(fetchPosts.pending,(state)=>{
            state.status="loading";
        })
        .addCase(fetchPosts.fulfilled,(state,action)=>{
            state.status="succeeded";
            state.posts=action.payload.posts;
        })
        .addCase(fetchPosts.rejected,(state,action)=>{
            state.status="failed";
            state.error=action.error.message;
        })
        .addCase(addNewPost.fulfilled,(state,action)=>{
            console.log(action.payload)
            state.posts.unshift(action.payload.post);
        })
        .addCase(deletePost.fulfilled,(state,action)=>{
            const index=state.posts.findIndex((post)=>post.id===action.payload);
            state.posts.splice(index,1);
        })
        .addCase(handleReaction.fulfilled,(state,action)=>{
           const {postId,reaction}=action.payload;
           console.log(action.payload);
            const existingPost=state.posts.find((post)=>post.id===postId);
            if(existingPost){
                existingPost.reactions[reaction]++;
            }
                
        })
        .addCase(handleReaction.rejected,(state,action)=>{
            console.log(action.error.message);
        })
        .addCase(updatePost.fulfilled,(state,action)=>{
            const {id,title,content}=action.payload;
            const existingPost=state.posts.find((post)=>post.id===id);
            if(existingPost){
                existingPost.title=title;
                existingPost.content=content;
            }
        })

    }
})

export const {addPosts}=postsSlice.actions;
export default postsSlice.reducer;