import { getCollection } from "astro:content";
import { fixSlugPrefix } from "../shared/pathHelpers";

const getBaseName = (path: string) => path.split("/").pop() || "";

// type Post<TFrontmatter, TProps, TParams> = {
//   id: string;
//   frontmatter: TFrontmatter;
//   slug: string;
//   params?: TParams;
//   props?: TProps;
// };
export const PostCollections = {
  _posts: await getCollection("posts"),

  async getPosts() {
    let posts = this._posts;
    
    let fixedPosts = posts
      .map((post) => ({
        ...post,
        slug: fixSlugPrefix(post.slug),
      }))
      .sort(
        // @ts-ignore
        (a, b) => a.data?.date - b.data?.date
      )
      .reverse();
  
    console.log("dataCache.getPosts", fixedPosts.length);
  
    return fixedPosts;
  },
  getStaticPaths() {
    let posts = this._posts;
  
    let fixedPosts = posts.map((post) => ({
      params: { slug: fixSlugPrefix(post.slug) },
      props: { ...post, slug: post.slug },
    }));
  
    console.log("getStaticPaths", fixedPosts[0]);
  
    return fixedPosts;
  },

  async getCategoryList() {
    let posts = await PostCollections.getPosts();
    let categories = [
      ...new Set(
        posts.map((post) => post.data.category).filter((category) => category)
      ),
    ];
    console.log("dataCache.getCategoryList", categories.length);
  
    return categories;
  }
}



export const images = import.meta.glob<{ default: ImageMetadata }>(
  "/src/content/posts/**/*.{jpeg,jpg,png,gif,svg}"
);

const imagePaths = Object.fromEntries(
  Object.entries(images).map(([path, image]) => {
    return [getBaseName(path), image];
  })
);
export const getImageProps = async (imagePath: string) => {
  // console.log('images:', images, 'imagePath:', imagePath);
  if (!imagePaths[imagePath])
    throw new Error(
      `"${imagePath}" does not exist in glob: "src/assets/*.{jpeg,jpg,png,gif,svg}"`
    );

  return (await imagePaths[imagePath]()).default;
};
