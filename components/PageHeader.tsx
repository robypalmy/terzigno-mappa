import Link from "next/link";

type PageHeaderProps = {
  title: string;
  subtitle: string;
  current: "raccolta" | "fontanelle";
};

export function PageHeader({ title, subtitle, current }: PageHeaderProps) {
  return (
    <header className="shrink-0 border-b border-stone-200 bg-white">
      <div className="px-4 py-3 sm:px-5">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-medium uppercase tracking-wide text-stone-500">
            Comune di Terzigno
          </p>
          <nav aria-label="Sezioni" className="flex shrink-0 items-center gap-1">
            <NavLink href="/" active={current === "raccolta"}>
              Raccolta rifiuti
            </NavLink>
            <NavLink href="/fontanelle" active={current === "fontanelle"}>
              Fontanelle
            </NavLink>
          </nav>
        </div>
        <h1 className="mt-1.5 text-lg font-semibold leading-6 text-stone-900 sm:text-xl">
          {title}
        </h1>
        <p className="mt-1 text-sm leading-5 text-stone-600">{subtitle}</p>
      </div>
    </header>
  );
}

function NavLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: string;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`rounded-md px-2.5 py-1.5 text-sm ${
        active
          ? "font-semibold text-[#1e3a5f]"
          : "font-medium text-stone-600 underline-offset-2 hover:text-stone-900 hover:underline"
      }`}
    >
      {children}
    </Link>
  );
}
