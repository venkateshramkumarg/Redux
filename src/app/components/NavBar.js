import Link from "next/link";

const NavBar=()=>{
    return(
        <nav className="flex justify-between bg-blue-500 text-white h-10 items-center text-md p-3">
               <h1  className="text-2xl"> Redux Blog</h1>
                <div className="flex justify-between gap-3">
                    <Link href="/" className="hover:underline">Home</Link>
                    <Link href="/addpost" className="hover:underline">Add Post</Link>
                </div>
        </nav>
    )
}

export default NavBar;