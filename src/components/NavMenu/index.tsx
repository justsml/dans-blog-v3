"use client";
import "./index.css";
import React from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import classNames from "classnames";
import {
  getImageProps,
  getSrcPath,
  PostCollections,
  getResponsiveImage,
} from "@/shared/dataCache";
import { slugify } from "@/shared/pathHelpers";
import avatarImage from "@/assets/avatar.png";
import {
  CaretDownIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon,
  RocketIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import { ListItem } from "./ListItem";
import { ArticleCard } from "./ArticleCard";

const { getCategoryCounts, getPopularPosts, getTagCounts } = PostCollections;

const categories = getCategoryCounts();
const popularPosts = getPopularPosts();
const tagCounts = getTagCounts();
const allPosts = PostCollections._posts;

// const popIdx = Math.floor(Math.random() * popularPosts.length);
// const popularSelection = popularPosts[popIdx];

const NavMenu = () => {
  return (
    <NavigationMenu.Root className="NavigationMenuRoot" delayDuration={200}>
      <NavigationMenu.List className="NavigationMenuList">
        <NavigationMenu.Item value="/posts/">
          <NavigationMenu.Trigger className="NavigationMenuTrigger">
            Articles <CaretDownIcon className="CaretDown" aria-hidden />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content
            className="NavigationMenuContent"
            style={
              {
                // margin: '0 2rem',
                // minWidth: '75vw',
              }
            }
          >
            <h4 style={{ gridColumn: "span 2" }}>Browse by Category</h4>
            <ul className="List one item-list-sm">
              {categories.map(([tag, count]) => (
                <ListItem
                  key={tag}
                  title={tag}
                  href={`/category/${slugify(tag)}/`}
                  className="CategoryItem"
                >
                  {tag} <sup>{count}</sup>
                </ListItem>
              ))}
            </ul>
            <h4 style={{ gridColumn: "span 2" }}>Popular Posts</h4>
            <ul className="List one item-list-lg">
              {popularPosts.map((post) => (
                <ArticleCard key={post.slug} post={post} />
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
              <li className="row-span-2">
                <NavigationMenu.Link asChild>
                  <div className="Callout neon-bg-6">
                    <a href="/about">
                      <img
                        src={avatarImage.src}
                        width={avatarImage.width}
                        height={avatarImage.height}
                      />
                    </a>
                    <div className="CalloutHeading">Dan Levy</div>
                    <p className="CalloutText">
                      Coder | Leader
                      <br /> Tinker | Thinker
                    </p>
                  </div>
                </NavigationMenu.Link>
              </li>
              <li style={{ gridRow: "span 2" }}>
                <NavigationMenu.Link asChild>
                  <div className="Callout">
                    <div className="CalloutHeading">Contact Me</div>
                    <p className="CalloutText"></p>
                    <p className="SocialLinks">
                      <a href="http://twitter.com/justsml" target="_blank">
                        <TwitterLogoIcon className="Icon" /> Twitter
                      </a>
                      <a href="https://github.com/justsml" target="_blank">
                        <GitHubLogoIcon className="Icon" /> GitHub
                      </a>
                      <a
                        href="https://linkedin.com/in/realdaniellevy"
                        target="_blank"
                      >
                        <LinkedInLogoIcon className="Icon" /> LinkedIn
                      </a>
                      <a href="/docs/resume.pdf" target="_blank">
                        <RocketIcon className="Icon" /> Résumé (PDF)
                      </a>
                    </p>
                  </div>
                </NavigationMenu.Link>
              </li>
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

export default NavMenu;
