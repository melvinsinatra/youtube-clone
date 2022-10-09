import { createContext, useContext, useState } from "react";
import { categories } from "../utils/constants";

const CategoryContext = createContext();
const CategoryUpdateContext = createContext();

export function useCategory() {
  return useContext(CategoryContext);
}

export function useUpdateCategory() {
  return useContext(CategoryUpdateContext);
}

export function VideoContextProvider({children}) {

	const [category, setCategory] = useState(categories[0]);
  
  return (
    <CategoryContext.Provider value={category}>
      <CategoryUpdateContext.Provider value={setCategory}>
        {children}
      </CategoryUpdateContext.Provider>
    </CategoryContext.Provider>
  )
}