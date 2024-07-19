"use client";

import * as React from "react";
import { Image } from "astro:assets";

import { cn } from "@/utils";
import avatarImage from "@/assets/avatar.png";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { PostCollections } from "@/shared/dataCache";
import { slugify } from "@/shared/pathHelpers";

const { getCategoryCounts, getPopularPosts, getTagCounts } = PostCollections;

const categories = getCategoryCounts();
const popularPosts = getPopularPosts();
const tagCounts = getTagCounts();


export function NavBar() {
  return (
    <NavigationMenu className="relative z-[1] flex w-screen justify-center">
      <NavigationMenuList className="center shadow-blackA4 m-0 flex list-none rounded-[6px] bg-white p-1">
        <NavigationMenuItem>
          <NavigationMenuTrigger>Home</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-3 lg:w-[600px] ">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <Image
                      src={avatarImage}
                      alt={"Dan Levy's avatar"}
                      width={128}
                      height={128}
                    />
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Dan Levy
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      writes things.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>

              {popularPosts.map((post) => (
                <ListItem
                  key={post.slug}
                  title={post.data.title}
                  href={`/${post.slug}/`}
                >
                  <small>{post.data.subTitle}</small>
                </ListItem>
              ))}

              {categories.map(([tag, count]) => (
                <ListItem
                  key={tag}
                  title={tag}
                  href={`/category/${slugify(tag)}/`}
                >
                  {tag} <sup>{count}</sup>
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Popular</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <img
                      src={avatarImage.src}
                      width={avatarImage.width}
                      height={avatarImage.height}
                    />
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Dan Levy
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      writes things.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>

              <ListItem href="/docs/primitives/typography" title="Typography">
                Styles for headings, paragraphs, lists...etc
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Tags</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-3 lg:w-[600px] overflow-y-scroll h-[375px]">
              {tagCounts.map(([tag, count]) => (
                <ListItem key={tag} title={tag} href={`/tag/${tag}/`}>
                  {tag} <sup>{count.length}</sup>
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <a href="/docs">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Documentation
            </NavigationMenuLink>
          </a>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
