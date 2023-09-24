import { getPostsMeta, getPostByName } from "@/lib/posts";
import React from "react";
import { notFound } from "next/navigation";
import getFormattedDate from "@/lib/getFormattedDate";
import Link from "@/node_modules/next/link";
import "highlight.js/styles/github-dark.css";

export const revalidate = 10;

type Props = {
  params: {
    postId: string;
  };
};

//Calling the generateStaticParams() to generate all the possible pages at build time for SSG
export async function generateStaticParams() {
  const posts = await getPostsMeta(); //deduped
  if (!posts) return [];
  return posts.map((post) => ({
    postId: post.id,
  }));
}

//Generating dynamic metadata for every page
export async function generateMetadata({ params: { postId } }: Props) {
  const post = await getPostByName(`${postId}.mdx`); //deduped the request

  if (!post) {
    return {
      title: "Post Not found",
    };
  }
  return {
    title: post.meta.title,
  };
}

export default async function Post({ params: { postId } }: Props) {
  const post = await getPostByName(`${postId}.mdx`); //deduped the request

  if (!post) notFound();
  const { meta, content } = post;

  const pubDate = getFormattedDate(meta.date);

  const tags = meta.tags.map((tag, i) => (
    <Link key={i} href={`/tags/${tag}`}>
      {tag}
    </Link>
  ));
  return (
    <>
      <h2 className="text-3xl mt-4 mb-0">{meta.title}</h2>
      <p className="mt-0 text-sm">{pubDate}</p>
      <article>{content}</article>
      <section>
        <h3>Related:</h3>
        <div className="flex flex-row gap-4">{tags}</div>
      </section>
      <p className="mb-10">
        <Link href="/">← Back to home</Link>
      </p>
    </>
  );
}
