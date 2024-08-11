import classNames from "classnames";

export default function Skeleton({ className }: { className?: string }) {
    return <div className={classNames(`bg-slate-200 motion-safe:animate-pulse rounded`, className)} />;
}