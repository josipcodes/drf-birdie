import React, { useEffect, useState } from "react";
import axios from "axios";
import appStyles from ".././App.module.css";
import Asset from ".././components/Asset";

import styles from ".././styles/PopularCategories.module.css"
import { Link } from "react-router-dom";

import {useSelectedCategory, useSetSelectedCategory } from "../contexts/SelectedCategoryContext";

const PopularCategories = () => {
  const [categories, setCategories] = useState("");

  const selectedCategory = useSelectedCategory()
  const setSelectedCategory = useSetSelectedCategory()


  useEffect(() => {
    // fetching existing categories
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get("/categories/");
        setCategories(data);
        console.log("categories", data);
        console.log("categories", data.results);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCategories();
  }, []);

  const handleClick = (category_id) => {
    // setting selected category
    setSelectedCategory(category_id);
    console.log("category_id", category_id)
    console.log("selectedCategory", selectedCategory)
  };

  return (
    <div className={`${appStyles.Content}`}>
      {categories.results?.length ? (
        <>
        {/* display categories in the order of popularity */}
          <h1 className={styles.Header}>Popular categories</h1>
          {categories.results?.map((category) => (
            <Link to={`/categories/${category.id}/posts`} className={styles.CategoryName} key={category.id} onClick={() => handleClick(category.id)}>{category.name}</Link>
          ))}
        </>
      ) : (
        <Asset spinner />
      )}
    </div>
  );
};


export default PopularCategories;