/** Only in-app routes used on the not-found page (required for typed `Link href`). */
export type NotFoundHref = "/" | "/blog" | "/shop";

export type NotFoundMessages = {
  codeLabel: string;
  title: string;
  description: string;
  primaryHref: NotFoundHref;
  primaryLabel: string;
  secondaryHref: NotFoundHref;
  secondaryLabel: string;
};

const genericNotFound: NotFoundMessages = {
  codeLabel: "404",
  title: "This page could not be found",
  description:
    "The link may be outdated, or the page may have been removed. Use the options below to continue browsing our custom packaging catalog.",
  primaryHref: "/",
  primaryLabel: "Back to home",
  secondaryHref: "/shop",
  secondaryLabel: "Browse products",
};

export function getNotFoundMessages(pathname: string): NotFoundMessages {
  const path = (pathname || "/").replace(/\/$/, "") || "/";

  if (path.startsWith("/product/")) {
    return {
      codeLabel: "PRODUCT",
      title: "Product not found",
      description:
        "The product you are looking for does not exist or may have been removed. Try the shop or return home to keep browsing.",
      primaryHref: "/",
      primaryLabel: "Back to home",
      secondaryHref: "/shop",
      secondaryLabel: "Browse products",
    };
  }

  if (path.startsWith("/category/")) {
    return {
      codeLabel: "CATEGORY",
      title: "Category not found",
      description:
        "We could not find this packaging category. It may have been renamed or removed. Explore the shop or start from the home page.",
      primaryHref: "/",
      primaryLabel: "Back to home",
      secondaryHref: "/shop",
      secondaryLabel: "Browse products",
    };
  }

  if (path.startsWith("/blog/")) {
    return {
      codeLabel: "BLOG",
      title: "Blog post not found",
      description:
        "The article you are looking for does not exist or may have been moved. Read other posts from our blog or head home.",
      primaryHref: "/blog",
      primaryLabel: "Back to blog",
      secondaryHref: "/",
      secondaryLabel: "Home",
    };
  }

  return genericNotFound;
}
