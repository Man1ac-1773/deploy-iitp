import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "#research", label: "Research" },
  { href: "#publications", label: "Publications" },
  { href: "#timeline", label: "Timeline" },
  { href: "#students", label: "Students" },
  { href: "#contact", label: "Contact" },
] as const;

type SectionNavProps = {
  className?: string;
};

export function SectionNav({ className }: SectionNavProps) {
  return (
    <nav aria-label="Page sections" className={cn(className)}>
      <ul className="flex flex-col gap-3">
        {NAV_ITEMS.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
