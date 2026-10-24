import { useEffect } from 'react';

type PageMeta = {
  title: string;
  description: string;
  url: string;
  type?: 'website' | 'article';
  jsonLd?: Record<string, unknown>;
};

/**
 * Sets the page title, description, canonical link and share tags for one page,
 * and puts the previous values back when the page is left.
 */
export function usePageMeta({ title, description, url, type = 'article', jsonLd }: PageMeta) {
  const ld = jsonLd ? JSON.stringify(jsonLd) : '';

  useEffect(() => {
    const restorers: Array<() => void> = [];

    const setAttr = (selector: string, create: () => HTMLElement, attr: string, value: string) => {
      let el = document.head.querySelector<HTMLElement>(selector);
      const created = !el;
      if (!el) {
        el = create();
        document.head.appendChild(el);
      }
      const prev = el.getAttribute(attr);
      el.setAttribute(attr, value);
      const node = el;
      restorers.push(() => {
        if (created) node.remove();
        else if (prev !== null) node.setAttribute(attr, prev);
      });
    };

    const meta = (attr: 'name' | 'property', key: string, value: string) =>
      setAttr(
        `meta[${attr}="${key}"]`,
        () => {
          const m = document.createElement('meta');
          m.setAttribute(attr, key);
          return m;
        },
        'content',
        value,
      );

    const prevTitle = document.title;
    document.title = title;
    restorers.push(() => {
      document.title = prevTitle;
    });

    meta('name', 'description', description);
    meta('property', 'og:title', title);
    meta('property', 'og:description', description);
    meta('property', 'og:url', url);
    meta('property', 'og:type', type);
    meta('name', 'twitter:title', title);
    meta('name', 'twitter:description', description);
    setAttr(
      'link[rel="canonical"]',
      () => {
        const l = document.createElement('link');
        l.setAttribute('rel', 'canonical');
        return l;
      },
      'href',
      url,
    );

    let script: HTMLScriptElement | null = null;
    if (ld) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = ld;
      document.head.appendChild(script);
    }

    return () => {
      script?.remove();
      restorers.reverse().forEach((r) => r());
    };
  }, [title, description, url, type, ld]);
}
