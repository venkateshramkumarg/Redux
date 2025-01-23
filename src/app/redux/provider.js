"use client";

import { Provider } from "react-redux";
import store from "./store";
import { fetchUsers } from "./features/usersSlice";
import { fetchPosts } from "./features/postsSlice";
import { useEffect } from "react";

export default function ClientProvider({ children }) {
  useEffect(() => {
    store.dispatch(fetchUsers());
    store.dispatch(fetchPosts());
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
