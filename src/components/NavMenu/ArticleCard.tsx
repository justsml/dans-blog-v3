import { getResponsiveImage, getSrcPath, type ResponsiveImagesType } from "../../shared/dataCache";
import Image from "@/components/Image.astro";
import { ListItem } from "./ListItem";
import { useEffect, useState } from "react";
import type { ImageMetadata } from "astro";

export const ArticleCard = ({post}: any) => {
  console.warn("ArticleCard:", post?.data?.cover, post);
  const cover = post?.data?.cover;
  if (!cover || !('src' in cover)) {
    console.error("ArticleCard: no src", post);
    return null;
  }
  const p = Reflect.get(cover, 'src');
  console.info('p', p)
  const imagePath = getSrcPath(p);
  const smallImage = getResponsiveImage(imagePath)?.mobile;

  const [image, setImage] = useState<ImageMetadata | null>(null);

  useEffect(() => {
    console.log("ArticleCard post", post);
    if (smallImage instanceof Promise) {
      smallImage.then((image) => {
        setImage(image);
      });
    }
  }, [smallImage]);

  return (<ListItem
    key={post.slug}
    title={post.data.title}
    href={`/${post.slug}/`}
    className="ArticleCard"
  >
    {image && 'src' in image && (
      <Image
        src={image}
        alt={post.data.title}
        width={50}
        height={50}
      />
    )}
    <small>{post.data.subTitle}</small>
  </ListItem>
)}