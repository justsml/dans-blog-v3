import { getCollection } from "astro:content";
import { fixSlugPrefix } from "../shared/pathHelpers";
// type PostType = CollectionEntry<"posts">;

const getBaseName = (path: string) => path.split("/").pop() || "";

const _posts = await getCollection("posts");

export const PostCollections = {
  _posts,
  _postsBySlug: _posts.reduce((acc, post) => {
    acc[post.slug] = post;
    return acc;
  }, {} as Record<string, (typeof _posts)[0]>),

  _categories: _posts.reduce((acc, post) => {
    const { category } = post.data;
    acc[category] = acc[category] == null ? 1 : acc[category] + 1;
    return acc;
  }, {} as Record<string, number>),

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
  getStaticPaths(): Array<{
    params: Record<string, unknown>;
    props: Record<string, unknown>;
  }> {
    let posts = this._posts;

    let fixedPosts = posts.map((post) => ({
      params: { slug: fixSlugPrefix(post.slug) },
      props: { ...post, slug: fixSlugPrefix(post.slug) },
    }));

    console.log("getStaticPaths[0]", fixedPosts[0]);

    return fixedPosts;
  },
  getCategoryList() {
    return PostCollections._categories;
  },
  getPostsByCategory(category: string) {
    return this._posts.filter((post) => post.data.category === category);
  },
};

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
