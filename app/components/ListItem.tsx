import getFormattedDate from "@/lib/getFormattedDate";
import Link from "@/node_modules/next/link";
import React from "react";

type Props = {
  post: Meta;
};

export default function ListItem({ post }: Props) {
  const { id, title, date } = post;
  const fromattedDate = getFormattedDate(date);

  return (
    <li className="mt-4 text-2xl dark:text-white/90">
      <Link
        className="underline hover:text-black/70 dark:hover:text-white"
        href={`/posts/${id}`}>
        {title}
      </Link>
      <br />
      <p className="text-sm mt-1">{fromattedDate}</p>
    </li>
  );
}
