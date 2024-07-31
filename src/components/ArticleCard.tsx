import { Image } from "astro:assets";
import type { CollectionEntry } from "astro:content";

type PostsType = CollectionEntry<"posts">;

export const ArticleCard = ({
  article,
  width,
}: {
  article: PostsType;
  width: number;
}) => {
  const { title, subTitle, cover_icon, date, category, tags } = article.data;

  const image =
    typeof cover_icon === "string" ? (
      <img src={cover_icon} alt={title} width={width} height={width} />
    ) : (
      <Image {...cover_icon} alt={title} width={width} height={width} />
    );

  return (
    <div className="article-card">
      <img src={cover} alt={title} />
      <h2>{title}</h2>
      <p>{subTitle}</p>
      <div>{date}</div>
      <div>{category}</div>
      <div>{tags.join(", ")}</div>
    </div>
  );
};
