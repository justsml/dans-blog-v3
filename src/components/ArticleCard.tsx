import { Image } from "astro:assets";
import type { CollectionEntry } from "astro:content";
import { formatDistance } from "date-fns/formatDistance";
import { CalendarIcon, TagIcon } from "lucide-react";
import { InfoLabel } from "../components/ui/infoLabel";

type PostsType = CollectionEntry<"posts">;

export type ArticlePost = {
  slug: string;
  collection?: string;

  data: {
    title: string;
    subTitle: string;
    cover_icon: ImageMetadata;
    cover_mobile: ImageMetadata;
    date: string;
    modified: string;
    category: string;
    subCategory?: string;
    tags: string[];
  };
};

export const ArticleCard = ({
  article,
  width,
}: {
  article: ArticlePost;
  width?: number;
}) => {
  const slug = article.slug;
  const { title, subTitle, cover_icon, cover_mobile, date, modified, category, tags } =
    article.data;

  const createdAgo = date ? formatDistance(new Date(date), new Date()) : "";
  const modifiedAgo = modified
    ? formatDistance(new Date(modified), new Date())
    : "";

  const icon = cover_mobile;
  // console.log(cover_icon);
  const image =
    typeof icon === "string" ? (
      <img src={icon} alt={title} width={width} height={width} />
    ) : (
      <img
        src={icon.src}
        alt={title}
        width={icon.width}
        height={icon.height}
      />
    );

  return (
    <a href={slug} className="article-card" title={title}>
      <label className="small-label">
        {category}
      </label>
      {/* <InfoLabel text={category} className="small-label">
        <TagIcon className="icon" />
      </InfoLabel> */}
      {image}
      <h2>
        {title}
      </h2>
      <p>{subTitle}</p>
      <InfoLabel
        text={[`created ${createdAgo} ago`, `updated ${modifiedAgo} ago`]}
      >
        <CalendarIcon className="icon" width={20} height={20} />
        
      </InfoLabel>

    </a>
  );
};
