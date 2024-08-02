import { Image } from "astro:assets";
import type { CollectionEntry } from "astro:content";
import { formatDistance } from "date-fns/formatDistance";
// import { CalendarIcon, TagIcon } from "lucide-react";

import { InfoLabel } from "../components/ui/infoLabel";
import { slugify } from "../shared/pathHelpers";
import { CalendarIcon } from "./icons/CalendarIcon";

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
  const {
    title,
    subTitle,
    cover_icon,
    cover_mobile,
    date,
    modified,
    category,
    tags,
  } = article.data;

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
      <img src={icon.src} alt={title} width={icon.width} height={icon.height} />
    );

  const categoryClass = `category-${slugify(category)}`;

  return (
    <a
      href={`/${slug}`}
      className={"article-card " + categoryClass}
      title={title}
      data-created={date}
      data-modified={modified}
    >
      <label className="small-label">{category}</label>
      <h2>{title}</h2>
      {image}
      <p>{subTitle}</p>
      <InfoLabel
        text={[`created ${createdAgo} ago`, `updated ${modifiedAgo} ago`]}
      >
        <CalendarIcon className="icon" width={20} height={20} />
      </InfoLabel>
    </a>
  );
};
