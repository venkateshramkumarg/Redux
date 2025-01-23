"use client"

import NavBar from "../components/NavBar";
import AddPost from "../components/AddPost";

export default function Page(){
    return (
        <div className="container mx-auto p-4">
          <NavBar/>
          <AddPost />
        </div>
      );
}