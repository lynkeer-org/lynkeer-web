"use client";

import type { BreadcrumbItemType } from "@/lib/breadcrumb/types";
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@lynkeer/ui/components/breadcrumb";
import Link from "next/link";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import styles from "./AppBreadcrumb.module.css";

interface ScrollableBreadcrumbListProps {
  items: BreadcrumbItemType[];
}

export function ScrollableBreadcrumbList({ items }: ScrollableBreadcrumbListProps) {
  const listRef = useRef<HTMLOListElement | null>(null);
  const [hasOverflowLeft, setHasOverflowLeft] = useState(false);
  const [hasOverflowRight, setHasOverflowRight] = useState(false);

  useEffect(() => {
    const el = listRef.current;
    if (!el) {
      return;
    }

    const update = () => {
      const { scrollLeft, clientWidth, scrollWidth } = el;
      setHasOverflowLeft(scrollLeft > 0);
      setHasOverflowRight(scrollLeft + clientWidth < scrollWidth - 1);
    };

    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, []);

  const fadeClass = useMemo(() => {
    if (hasOverflowLeft && hasOverflowRight) {
      return styles.fadeBoth;
    }

    if (hasOverflowLeft) {
      return styles.fadeLeft;
    }

    if (hasOverflowRight) {
      return styles.fadeRight;
    }

    return styles.fadeNone;
  }, [hasOverflowLeft, hasOverflowRight]);

  return (
    <BreadcrumbList
      ref={listRef}
      className={`flex min-w-0 overflow-x-auto whitespace-nowrap flex-nowrap ${styles.hideScrollbar} ${fadeClass}`}
    >
      {items.map((page, index) => {
        if (index === items.length - 1) {
          return (
            <BreadcrumbItem key={page.path} className="shrink-0">
              <BreadcrumbPage className="text-base font-medium">{page.label}</BreadcrumbPage>
            </BreadcrumbItem>
          );
        }

        return (
          <Fragment key={page.path}>
            <BreadcrumbItem className="shrink-0">
              <BreadcrumbLink asChild>
                <Link className="text-base font-medium" href={page.path}>
                  {page.label}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator className="shrink-0" />
          </Fragment>
        );
      })}
    </BreadcrumbList>
  );
}
