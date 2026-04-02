import React from "react";

export default function MaxWidthWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`max-w-[1440px] px-5 xl:px-0 mx-auto ${className}`}>
      {children}
    </div>
  );
}
