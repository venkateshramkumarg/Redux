"use client"

import ShowPosts from "./components/ShowPosts";
import NavBar from "./components/NavBar";


export default function Home() {

  return (
    <div className="container mx-auto p-4">
      <NavBar/>
      <ShowPosts />
    </div>
  );
}