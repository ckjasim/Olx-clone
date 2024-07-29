import React, { createContext, useState } from "react";

export const PostContext = createContext(null);

export function Postcontextprovider({ children }) {
  const [productdetails, setProductDetails] = useState(null);
  return (
    <PostContext.Provider value={{ productdetails, setProductDetails }}>
      {children}
    </PostContext.Provider>
  );
}


