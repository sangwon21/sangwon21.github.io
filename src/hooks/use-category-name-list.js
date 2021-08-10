// @flow strict
import { useStaticQuery, graphql } from "gatsby";

const useCategoryNameList = () => {
  const {
    allMarkdownRemark: { categories },
  } = useStaticQuery(
    graphql`
      query CategoryNameList {
        allMarkdownRemark(
          filter: {
            frontmatter: { template: { eq: "post" }, draft: { ne: true } }
          }
        ) {
          categories: group(field: id) {
            nodes {
              frontmatter {
                category
              }
              fields {
                categorySlug
              }
            }
          }
        }
      }
    `
  );

  const names = new Set();
  const values = [];
  categories.forEach((category) => {
    const target = category.nodes[0].frontmatter.category;
    if (names.has(target)) {
      return;
    }
    names.add(target);
    values.push([target, category.nodes[0].fields.categorySlug]);
  });

  return values;
};

export default useCategoryNameList;
