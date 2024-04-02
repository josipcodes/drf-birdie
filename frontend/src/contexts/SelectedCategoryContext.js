import { createContext, useContext, useState } from "react";

// based off of Moments lessons
export const SelectedCategoryContext = createContext();
export const SetSelectedCategoryContext = createContext();

export const useSelectedCategory = () => useContext(SelectedCategoryContext);
export const useSetSelectedCategory = () => useContext(SetSelectedCategoryContext);

export const SelectedCategoryProvider = ({ children }) => {
    // manually inputing a nonexistant id in the url will default to the first category created
  const [selectedCategory, setSelectedCategory] = useState(1);

  return (
    // Providers allow current user value and
    // function that is updating it to be available to all children
    <SelectedCategoryContext.Provider value={selectedCategory}>
      <SetSelectedCategoryContext.Provider value={setSelectedCategory}>
        {children}
      </SetSelectedCategoryContext.Provider>
    </SelectedCategoryContext.Provider>
  );
};
