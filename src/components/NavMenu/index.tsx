"use client";
import "./index.css";
import React from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import classNames from "classnames";
import { CaretDownIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import { PostCollections } from "@/shared/dataCache";
import { slugify } from "@/shared/pathHelpers";
import avatarImage from "@/assets/avatar.png";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

const { getCategoryCounts, getPopularPosts, getTagCounts } = PostCollections;

const categories = getCategoryCounts();
const popularPosts = getPopularPosts();
const tagCounts = getTagCounts();
const allPosts = PostCollections._posts;

// const popIdx = Math.floor(Math.random() * popularPosts.length);
// const popularSelection = popularPosts[popIdx];

const NavMenu = () => {
  return (
    <NavigationMenu.Root className="NavigationMenuRoot">
      <NavigationMenu.List className="NavigationMenuList">
        <NavigationMenu.Item>
          <NavigationMenu.Trigger className="NavigationMenuTrigger">
            Articles
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="NavigationMenuContent">
            <ul className="List one">
              <li className="row-span-3">
                <NavigationMenu.Link asChild>
                  <a className="Callout neon-bg-6" href="/about">
                    <img
                      src={avatarImage.src}
                      width={avatarImage.width}
                      height={avatarImage.height}
                    />
                    <div className="CalloutHeading">Dan Levy</div>
                    <p className="CalloutText">Coder | Leader
                      <br /> Tinker | Thinker</p>
                  </a>
                </NavigationMenu.Link>
              </li>

              {allPosts.map((post) => (
                <ListItem
                  key={post.slug}
                  title={post.data.title}
                  href={`/${post.slug}/`}
                  className="ArticleCard"
                >
                  {post.data.cover.src && (
                    <img
                      src={post.data.cover.src}
                      alt={post.data.title}
                      width={75}
                      height={75}
                    />
                  )}
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
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Trigger className="NavigationMenuTrigger">
            Open Source <CaretDownIcon className="CaretDown" aria-hidden />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="NavigationMenuContent">
            <ul className="List one">
              <li style={{ gridRow: "span 3" }}>
                <NavigationMenu.Link asChild>
                  <a
                    className="Callout neon-bg-3"
                    href="https://github.com/elite-libs"
                    target="_blank"
                  >
                    <div className="CalloutHeading">elite-libs</div>
                    <p className="CalloutText">An Open Source joint.</p>
                  </a>
                </NavigationMenu.Link>
              </li>

              <ListItem
                href="https://dataanalyzer.app/"
                title="DataAnalyzer.app"
              >
                A data analysis tool for developers and data scientists.
              </ListItem>
              <ListItem
                href="https://fpromises.io/"
                title="Functional Promises"
              >
                A functional programming library for JavaScript promises.
              </ListItem>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Trigger className="NavigationMenuTrigger">
            Projects <CaretDownIcon className="CaretDown" aria-hidden />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="NavigationMenuContent">
            <ul className="List one">
              <li style={{ gridRow: "span 2" }}>
                <NavigationMenu.Link asChild>
                  <a
                    className="Callout neon-bg-2"
                    href="https://github.com/justsml"
                    target="_blank"
                  >
                    <div className="CalloutHeading">Demos &amp; Examples</div>
                    <p className="CalloutText">
                      Check out a selection of my examples, experiments and misc
                      repos.
                    </p>
                  </a>
                </NavigationMenu.Link>
              </li>
              <ListItem
                href="https://github.com/justsml/node-streaming-image-proxy"
                title="Node Streaming Image Proxy"
              >
                High performance image resizing proxy for Node.js.
              </ListItem>
              <ListItem
                href="https://github.com/justsml/fact-service"
                title="Fact Service"
              >
                Powerful Key-Value Service. Feat. several DB adapters: Postgres,
                Redis, DynamoDB, Firestore, Cassandra, and more.
              </ListItem>
              <ListItem
                href="https://github.com/justsml/bun-elysia-htmx"
                title="Elysia &amp; HTMX magic"
              >
                A refactored Bun + HTMX experiment. Showcases Elysia's beautiful
                API, as my favorite Express alternative.
              </ListItem>
              <ListItem
                href="https://github.com/justsml/modern-app-template"
                title="Modern App Starter Base"
              >
                A modern app starter using TS, Vite, React, Tailwind CSS, and
                more.
              </ListItem>
              <ListItem
                href="https://github.com/justsml/knex-full-text-search"
                title="Knex Full Text Search"
              >
                Simplify Full-text web searches with a convenient Knex.js
                plugin.
              </ListItem>
              <ListItem
                href="https://github.com/justsml/knex-spatial"
                title="Knex Spatial"
              >
                Super simple spatial queries with my Knex.js plugin.
              </ListItem>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Trigger className="NavigationMenuTrigger">
            Hire Me <CaretDownIcon className="CaretDown" aria-hidden />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="NavigationMenuContent">
            <ul className="List one">
              <li style={{ gridRow: "span 2" }}>
                <NavigationMenu.Link asChild>
                  <div className="Callout neon-bg-4">
                    <div className="CalloutHeading">Contact Me</div>
                    <p className="CalloutText">
                      <TwitterLogoIcon className="Icon" />
                    </p>
                  </div>
                </NavigationMenu.Link>
              </li>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Trigger className="NavigationMenuTrigger">
            Overview <CaretDownIcon className="CaretDown" aria-hidden />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="NavigationMenuContent">
            <ul className="List two">
              <ListItem
                title="Introduction"
                href="/primitives/docs/overview/introduction"
              >
                Build high-quality, accessible design systems and web apps.
              </ListItem>
              <ListItem
                title="Getting started"
                href="/primitives/docs/overview/getting-started"
              >
                A quick tutorial to get you up and running with Radix
                Primitives.
              </ListItem>
              <ListItem title="Styling" href="/primitives/docs/guides/styling">
                Unstyled and compatible with any styling solution.
              </ListItem>
              <ListItem
                title="Animation"
                href="/primitives/docs/guides/animation"
              >
                Use CSS keyframes or any animation library of your choice.
              </ListItem>
              <ListItem
                title="Accessibility"
                href="/primitives/docs/overview/accessibility"
              >
                Tested in a range of browsers and assistive technologies.
              </ListItem>
              <ListItem
                title="Releases"
                href="/primitives/docs/overview/releases"
              >
                Radix Primitives releases and their changelogs.
              </ListItem>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Indicator className="NavigationMenuIndicator">
          <div className="Arrow" />
        </NavigationMenu.Indicator>
      </NavigationMenu.List>

      <div className="ViewportPosition">
        <NavigationMenu.Viewport className="NavigationMenuViewport" />
      </div>
    </NavigationMenu.Root>
  );
};

interface ListItemProps {
  title: string;
  href: string;
  className?: string;
  children: React.ReactNode;
}

const ListItem = React.forwardRef<HTMLAnchorElement, ListItemProps>(
  (
    { className, children, title, ...props },
    forwardedRef: React.ForwardedRef<HTMLAnchorElement>
  ) => (
    <li>
      <NavigationMenu.Link asChild>
        <a
          className={classNames("ListItemLink", className)}
          {...props}
          ref={forwardedRef}
        >
          <div className="ListItemHeading">{title}</div>
          <p className="ListItemText">{children}</p>
        </a>
      </NavigationMenu.Link>
    </li>
  )
);

export default NavMenu;