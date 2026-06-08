import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "#research", label: "Overview", index: "01" },
  { href: "#graph", label: "Taxonomy", index: "02" },
  { href: "#publications", label: "Archive", index: "03" },
  { href: "#timeline", label: "Record", index: "04" },
  { href: "#students", label: "Advisees", index: "05" },
  { href: "#contact", label: "Terminal", index: "06" },
] as const;

type SectionNavProps = {
  className?: string;
};

export function SectionNav({ className }: SectionNavProps) {
  return (
    <nav aria-label="Page sections" className={cn(className)}>
      <ul className="flex flex-col gap-4 border-l border-border/60 pl-5 py-2">
        {NAV_ITEMS.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              className="group flex items-baseline gap-3 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              <span className="font-mono text-[10px] text-accent/60 group-hover:text-accent transition-colors duration-300">
                {item.index}
              </span>
              <span className="font-bold tracking-wider uppercase">
                {item.label}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
