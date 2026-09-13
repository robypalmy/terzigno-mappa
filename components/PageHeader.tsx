import Image from "next/image";
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
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 items-start gap-3">
            <Image
              src="/stemma-terzigno.png"
              alt="Stemma del Comune di Terzigno"
              width={48}
              height={62}
              priority
              className="h-12 w-auto shrink-0 sm:h-14"
            />
            <div className="min-w-0">
              <p className="font-[family-name:var(--font-serif)] text-sm font-bold uppercase tracking-[0.08em] text-[#1e3a5f] sm:text-base">
                Comune di Terzigno
              </p>
              <h1 className="mt-1 text-lg font-semibold leading-6 text-stone-900 sm:text-xl">
                {title}
              </h1>
              <p className="mt-1 text-sm leading-5 text-stone-600">{subtitle}</p>
            </div>
          </div>
          <nav aria-label="Sezioni del sito" className="grid grid-cols-2 gap-2 sm:w-auto sm:min-w-[20rem]">
            <NavLink href="/" active={current === "raccolta"}>
              Raccolta rifiuti
            </NavLink>
            <NavLink href="/fontanelle" active={current === "fontanelle"}>
              Fontanelle
            </NavLink>
          </nav>
        </div>
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
      className={`inline-flex min-h-11 items-center justify-center rounded-lg border px-3 text-center text-sm font-semibold no-underline transition-colors ${
        active
          ? "border-[#1e3a5f] bg-[#1e3a5f] text-white"
          : "border-stone-300 bg-white text-stone-800 hover:border-[#1e3a5f] hover:bg-stone-50"
      }`}
    >
      {children}
    </Link>
  );
}
