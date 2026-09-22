import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import type { ReactNode } from "react";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Dr. Shivam Mehta & Dr. Krina Morabia — Wedding Invitation | Groom Side" },
      {
        name: "description",
        content:
          "Official groom-side wedding invitation of Dr. Shivam Mehta & Dr. Krina Morabia. Celebrations from 20 to 22 November 2026. Join the Mehta & Morabia families in celebration.",
      },
      { property: "og:site_name", content: "InviteStory" },
      { property: "og:title", content: "Dr. Shivam Mehta & Dr. Krina Morabia — Wedding Invitation" },
      {
        property: "og:description",
        content:
          "Together with their families, Dr. Shivam Mehta & Dr. Krina Morabia warmly invite you to celebrate their wedding on 20, 21 & 22 November 2026.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://shivam-weds-krina.invitestory.in/" },
      { property: "og:image", content: "https://shivam-weds-krina.invitestory.in/og-image.jpg" },
      { property: "og:image:secure_url", content: "https://shivam-weds-krina.invitestory.in/og-image.jpg" },
      { property: "og:image:type", content: "image/jpeg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      {
        property: "og:image:alt",
        content: "Dr. Shivam Mehta & Dr. Krina Morabia Wedding Invitation — 20 to 22 November 2026",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Dr. Shivam Mehta & Dr. Krina Morabia — Wedding Invitation" },
      {
        name: "twitter:description",
        content:
          "Official groom-side wedding invitation of Dr. Shivam Mehta & Dr. Krina Morabia. Celebrations on 20, 21 & 22 November 2026.",
      },
      { name: "twitter:image", content: "https://shivam-weds-krina.invitestory.in/og-image.jpg" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Marcellus&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
