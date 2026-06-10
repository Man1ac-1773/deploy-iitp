"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
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
      {src ? (
        <div className="relative z-10 size-full overflow-hidden rounded-sm">
          <Image 
            src={src} 
            alt={alt} 
            fill 
            sizes="(min-width: 1024px) 96px, (min-width: 640px) 80px, 64px" 
            className="object-cover grayscale contrast-125 hover:grayscale-0 hover:contrast-100 hover:scale-105 transition-all duration-500" 
          />
        </div>
      ) : null}
      {!src ? (
        <AvatarFallback className="rounded-sm border border-dashed border-muted-foreground/30 bg-surface text-xs font-medium tracking-wider text-muted-foreground uppercase sm:text-sm">
          {initials}
        </AvatarFallback>
      ) : null}
    </Avatar>
  );
}
