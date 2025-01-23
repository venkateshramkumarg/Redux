const users=[{
    id:1,
    name:"John Doe"
},
{
    id:2,
    name:"Jane Doe"
},
{
    id:3,
    name:"John Smith"
}];


export async function GET(req,res)
{
    return new Response(JSON.stringify({users:users,status:200}));
}