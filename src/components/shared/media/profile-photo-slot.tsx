import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type ProfilePhotoSlotProps = {
  src?: string | null;
  alt: string;
  initials: string;
  className?: string;
};

export function ProfilePhotoSlot({
  src,
  alt,
  initials,
  className,
}: ProfilePhotoSlotProps) {
  return (
    <Avatar
      data-profile-photo-slot
      className={cn(
        "size-16 rounded-sm after:rounded-sm sm:size-20 lg:size-24",
        className,
      )}
    >
      {src ? <AvatarImage src={src} alt={alt} className="rounded-sm" /> : null}
      <AvatarFallback className="rounded-sm border border-dashed border-muted-foreground/30 bg-surface text-xs font-medium tracking-wider text-muted-foreground uppercase sm:text-sm">
        {initials}
      </AvatarFallback>
    </Avatar>
  );
}
