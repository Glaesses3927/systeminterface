import { ReactNode } from "react";
import { VoteButtons } from "./VoteButtons";

export function GalleryCard({
  id,
  title,
  description,
  wide,
  children,
}: {
  id: string;
  title: string;
  description: string;
  wide?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={`group flex flex-col rounded-lg border border-zinc-200 bg-white p-5 transition-colors hover:border-amber-300/70 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-amber-700/50 ${
        wide ? "sm:col-span-2 lg:col-span-3" : ""
      }`}
    >
      <div className="mb-4">
        <h3 className="text-[15px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          {title}
        </h3>
        <p className="mt-1 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
          {description}
        </p>
      </div>
      <div
        className={`flex flex-1 items-center justify-center overflow-x-auto rounded-md border border-zinc-100 bg-zinc-50/60 p-6 dark:border-zinc-800/60 dark:bg-zinc-950/40 ${
          wide ? "min-h-[340px]" : "min-h-[160px] overflow-visible"
        }`}
      >
        {children}
      </div>
      <VoteButtons id={id} />
    </div>
  );
}
