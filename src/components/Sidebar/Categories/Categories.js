// @flow strict
import React from "react";
import { Link } from "gatsby";
import { useCategoryNameList } from "../../../hooks";
import styles from "./Categories.module.scss";

const Categories = () => {
  const categorySet = useCategoryNameList();

  return (
    <div className={styles["category-names"]}>
      <ul className={styles["category-names__list"]}>
        {categorySet &&
          categorySet.map(([name, slug]) => (
            <li className={styles["category-names__list-item"]} key={name}>
              <Link
                to={slug}
                className={styles["category-names__list-item-link"]}
              >
                {name}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Categories;
