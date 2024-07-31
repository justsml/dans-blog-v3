import { Image } from "astro:assets";
import type { CollectionEntry } from "astro:content";

type PostsType = CollectionEntry<"posts">;
export type ArticlePost = {
  slug: string;
  collection?: string;

  data: {
    title: string;
    subTitle: string;
    cover_icon: ImageMetadata;
    date: string;
    modified: string;
    category: string;
    subCategory?: string;
    tags: string[];
  };
}


export const ArticleCard = ({
  article,
  width,
}: {
  article: ArticlePost;
  width: number;
}) => {
  const slug = article.slug;
  const { title, subTitle, cover_icon, date, category, tags } = article.data;

  console.log(cover_icon)
  const image = <span>Image</span>
    // typeof cover_icon === "string" ? (
    //   <img src={cover_icon} alt={title} width={width} height={width} />
    // ) : (
    //   <Image src={cover_icon} alt={title} />
    // );

  return (
    <div className="article-card" title={title}>
      {image}
      <h2><a href={slug}>{title}</a></h2>
      <p>{subTitle}</p>
      <div>{category}</div>
      
    </div>
  );
};
