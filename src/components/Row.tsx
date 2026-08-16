"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";

export type RowLogo = { src: string; alt: string };

type RowProps = {
  index: string;
  title: string;
  sub: string;
  /** Trailing meta, e.g. "Summer 2025". Project rows carry no date. */
  right?: string;
  /** Experience and additional-experience rows have a logo; projects do not. */
  logo?: RowLogo;
  defaultOpen?: boolean;
  children: ReactNode;
};

export function Row({
  index,
  title,
  sub,
  right,
  logo,
  defaultOpen = false,
  children,
}: RowProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <article className="row" data-open={open}>
      <button
        className="row__btn"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="row__idx">{index}</span>
        <span className="row__main">
          <span className="row__title">{title}</span>
          <span className="row__sub">{sub}</span>
        </span>
        <span className="row__right">
          <span className="sign" aria-hidden="true">
            {open ? "−" : "+"}
          </span>
          {right ? ` ${right}` : null}
        </span>
        {logo ? (
          <Image
            className="row__logo"
            src={logo.src}
            alt={logo.alt}
            width={96}
            height={96}
          />
        ) : null}
      </button>
      <div className="row__body">
        <div className="row__inner">
          <div className="row__pad">{children}</div>
        </div>
      </div>
    </article>
  );
}
