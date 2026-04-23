"use client";

import { useEffect } from "react";

/**
 * TextReveal
 * ----------
 * Global, lightweight, word-by-word reveal for all text on the landing.
 *
 * How it works:
 *  1. Scans the document for text-bearing elements (h1..h4, p, li, blockquote,
 *     span.tr-target, [data-animate-words]) inside <main> / <footer> / <header>.
 *  2. For elements whose direct children are only plain text (plus the simple
 *     inline tags listed in SIMPLE_INLINES), it wraps each word in a
 *     `<span class="tr-word">`. Elements with nested components or icons are
 *     animated as a whole block (`.tr-block`).
 *  3. An IntersectionObserver adds `.tr-visible` when the element scrolls in,
 *     triggering the CSS-driven stagger defined in `globals.css`.
 *  4. A MutationObserver re-processes new nodes (added by router / locale
 *     switches) but skips anything already marked as done, so the work stays
 *     proportional to the new DOM.
 *
 * Opt-out: add `data-tr-skip` on an element (or any ancestor) to keep it out
 * of the reveal. We also auto-skip common "animated-already" contexts such as
 * elements inside the preloader, typewriter targets, marquees, etc.
 */

const MATCH_SELECTOR = [
  "main h1",
  "main h2",
  "main h3",
  "main h4",
  "main h5",
  "main p",
  "main li",
  "main blockquote",
  "main [data-animate-words]",
  "footer h3",
  "footer h4",
  "footer p",
  "footer li"
].join(",");

// Ancestors that opt a whole subtree out of the reveal.
const SKIP_ANCESTOR_SELECTOR = [
  "[data-tr-skip]",
  ".typewriter-cursor",
  ".animate-marquee",
  ".tr-container",
  ".tr-block"
].join(",");

// Tag names allowed inside a "simple" element that we can split into words.
const SIMPLE_INLINES = new Set([
  "SPAN",
  "STRONG",
  "EM",
  "B",
  "I",
  "U",
  "SMALL",
  "MARK",
  "BR"
]);

const DONE_ATTR = "data-tr-done";

function hasSkippedAncestor(el: Element): boolean {
  return !!el.closest(SKIP_ANCESTOR_SELECTOR);
}

function isSimpleContent(el: Element): boolean {
  for (const child of Array.from(el.childNodes)) {
    if (child.nodeType === Node.TEXT_NODE) continue;
    if (child.nodeType !== Node.ELEMENT_NODE) return false;
    const tag = (child as Element).tagName;
    if (!SIMPLE_INLINES.has(tag)) return false;
    // Recurse — nested inline must also be simple.
    if (!isSimpleContent(child as Element)) return false;
  }
  return true;
}

function splitIntoWords(node: Node) {
  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.textContent ?? "";
    if (!text.trim()) return;
    const frag = document.createDocumentFragment();
    // Keep whitespace as plain text nodes so line-breaks behave normally.
    const parts = text.split(/(\s+)/);
    for (const part of parts) {
      if (!part) continue;
      if (/^\s+$/.test(part)) {
        frag.appendChild(document.createTextNode(part));
      } else {
        const span = document.createElement("span");
        span.className = "tr-word";
        span.textContent = part;
        frag.appendChild(span);
      }
    }
    node.parentNode?.replaceChild(frag, node);
    return;
  }

  if (node.nodeType === Node.ELEMENT_NODE) {
    // Recurse into allowed inline wrappers, keeping their styling intact.
    Array.from(node.childNodes).forEach(splitIntoWords);
  }
}

function processElement(el: Element, io: IntersectionObserver) {
  if (el.hasAttribute(DONE_ATTR)) return;
  if (hasSkippedAncestor(el)) return;

  el.setAttribute(DONE_ATTR, "");

  const text = (el.textContent ?? "").trim();
  // Empty or overly long elements get a whole-block reveal instead of per-word
  // splitting, to keep the stagger snappy and avoid huge DOM work.
  if (!text) {
    el.classList.add("tr-block");
    io.observe(el);
    return;
  }

  if (text.length > 240 || !isSimpleContent(el)) {
    el.classList.add("tr-block");
    io.observe(el);
    return;
  }

  Array.from(el.childNodes).forEach(splitIntoWords);
  el.classList.add("tr-container");
  io.observe(el);
}

export function TextReveal() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("tr-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { root: null, rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    const scan = (root: ParentNode = document) => {
      const nodes = root.querySelectorAll(MATCH_SELECTOR);
      nodes.forEach((el) => processElement(el, io));
    };

    // Run after paint so first-view elements already have their word spans
    // when the IntersectionObserver fires.
    const raf = window.requestAnimationFrame(() => scan());

    // Re-scan on DOM changes (locale switches, lazy sections, etc.) — but
    // throttle via rAF and ignore our own mutations (words have the done attr).
    let scheduled = false;
    const mo = new MutationObserver((mutations) => {
      // Only care about added nodes; attribute changes we can ignore.
      let hasAdds = false;
      for (const m of mutations) {
        if (m.addedNodes.length > 0) {
          hasAdds = true;
          break;
        }
      }
      if (!hasAdds || scheduled) return;
      scheduled = true;
      window.requestAnimationFrame(() => {
        scheduled = false;
        scan();
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.cancelAnimationFrame(raf);
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
