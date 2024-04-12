import React, { useEffect, useState } from "react";
import axios from "axios";
import appStyles from ".././App.module.css";
import Asset from ".././components/Asset";

import styles from ".././styles/PopularCategories.module.css";
import { Link } from "react-router-dom";

import { useSetSelectedCategory } from "../contexts/SelectedCategoryContext";

const PopularCategories = ({ selectedCategory }) => {
  const [categories, setCategories] = useState("");

  const setSelectedCategory = useSetSelectedCategory();

  useEffect(() => {
    // fetch existing categories
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get("/categories/");
        setCategories(data);
      } catch (err) {
        // console.log(err);
      }
    };
    fetchCategories();
  }, []);

  const handleClick = (category_id) => {
    // setting selected category
    setSelectedCategory(category_id);
  };

  return (
    <div className={`${appStyles.Content} ${styles.CategoryContainer}`}>
      {categories?.results?.length ? (
        <>
          {/* display categories in the order of popularity */}
          <h1 className={styles.Header}>Popular categories</h1>
          {categories.results?.map((category) => (
            <Link
              to={`/categories/${category.id}/posts`}
              className={styles.CategoryName}
              key={category.id}
              onClick={() => handleClick(category.id)}
            >
              {category.name}
            </Link>
          ))}
        </>
      ) : (
        <Asset spinner />
      )}
    </div>
  );
};

export default PopularCategories;
