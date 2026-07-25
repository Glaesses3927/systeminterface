import { ReactNode } from "react";
import { VoteButtons } from "./VoteButtons";

export function GalleryCard({
  id,
  title,
  category,
  description,
  wide,
  children,
}: {
  id: string;
  title: string;
  category: string;
  description: string;
  wide?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={`flex flex-col rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 ${
        wide ? "sm:col-span-2 lg:col-span-3" : ""
      }`}
    >
      <div className="mb-3">
        <span className="inline-block rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
          {category}
        </span>
        <h3 className="mt-2 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          {title}
        </h3>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          {description}
        </p>
      </div>
      <div
        className={`flex flex-1 items-center justify-center overflow-x-auto rounded-lg bg-zinc-50 p-6 dark:bg-zinc-950/50 ${
          wide ? "min-h-[340px]" : "min-h-[160px] overflow-visible"
        }`}
      >
        {children}
      </div>
      <VoteButtons id={id} />
    </div>
  );
}
