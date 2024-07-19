import { getImage } from "astro:assets";
import { getCollection } from "astro:content";
import { fixSlugPrefix } from "../shared/pathHelpers";
// type PostType = CollectionEntry<"posts">;

const getBaseName = (path: string) => path.split("/").pop() || "";

const _postsCollection = await getCollection("posts");
let _posts = _postsCollection
  .map((post) => ({
    ...post,
    slug: fixSlugPrefix(post.slug),
  }))
  .sort(
    // @ts-ignore
    (a, b) => a.data?.date - b.data?.date
  )
  .reverse();

/**
 * PostCollections provides access to posts' data, pre-.
 */
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

  _tags: _posts.reduce((acc, post) => {
    // const { tags, } = post.data;
    const {
      slug,
      data: { tags },
    } = post;

    tags.forEach((tag) => {
      acc[tag] = acc[tag] == null ? [slug] : [...acc[tag], slug];
    });
    return acc;
  }, {} as Record<string, string[]>),

  /** `getTagCounts` returns a sorted list of tags and their counts. */
  getTagCounts() {
    return Object.entries(PostCollections._tags).sort(([, a], [, b]) =>
      b.length === a.length ? 0 : b.length > a.length ? 1 : -1
    );
  },

  /** `getCategoryCounts` returns a sorted list of categories and their counts. */
  getCategoryCounts() {
    return Object.entries(PostCollections._categories)
      .sort((a, b) => (a[1] === b[1] ? 0 : a[1] > b[1] ? -1 : 1))
      .filter(([tag, count]) => count > 1);
  },

  async getPosts() {
    let posts = this._posts;

    console.log("dataCache.getPosts", posts.length);

    return posts;
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

    // console.log("getStaticPaths[0]", fixedPosts[0]);

    return fixedPosts;
  },
  getCategoryList() {
    return PostCollections._categories;
  },
  getPostsByCategory(category: string) {
    return this._posts.filter((post) => post.data.category === category);
  },

  /** Popular posts according to google analytics. 2024/Q2 */
  getPopularPosts() {
    return [
      "js-quiz-14-date-time-questions-test-your-knowledge",
      "javascript-promises-quiz",
      "you-may-not-need-axios",
      "naming-things-real-good",
    ].map((slug) => PostCollections._postsBySlug[slug]);
  },

  generateCoverImgs() {
    // TODO?
  }
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
