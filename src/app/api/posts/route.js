const posts=[{
    id:"1",
    title:"First Post",
    content:"Hello!",
    userId:"1",
    date:new Date().toISOString(),
    reactions:{
        thumbsUp:0,
        hooray:0,
        heart:0,
        rocket:0,
        eyes:0
    }
},
{
    id:"2",
    title:"Second Post",
    content:"More text",
    userId:"2",
    date:new Date().toISOString(),
    reactions:{
        thumbsUp:0,
        hooray:0,
        heart:0,
        rocket:0,
        eyes:0
    }
}];


export async function GET (req, res) {
    console.log("Hello");
    
    return new Response(JSON.stringify({ posts: posts, status: 200 }));
}

export async function POST(req,res){
    const newPost=await req.json();
    newPost.id=(posts.length+1).toString();
    newPost.date=new Date().toISOString();
    newPost.reactions={
        thumbsUp:0,
        hooray:0,
        heart:0,
        rocket:0,
        eyes:0
    }
    console.log(newPost);
    posts.unshift(newPost);
    return new Response(JSON.stringify({post:newPost,status:200}));
}



export async function PATCH(req,res){
    const {postId,reaction}=await req.json();
    const post=posts.find((post)=>post.id===postId);
    post.reactions[reaction]++;
    return new Response(JSON.stringify({post,status:200}));
}

export async function PUT(req,res)
{
    const {id,title,content}=await req.json();
    const post=posts.find((post)=>post.id===id);
    post.title=title;
    post.content=content;
    return new Response(JSON.stringify({post,status:200}));
}

export async function DELETE(req,res){
    const {id}=await req.json();
    const index=posts.findIndex((post)=>post.id===id);
    posts.splice(index,1);
    return new Response(JSON.stringify({status:200}));
}