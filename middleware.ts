import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPortalRoute = createRouteMatcher(['/portal(.*)']);
const isPublicPortalRoute = createRouteMatcher([
  '/portal/sign-in(.*)',
  '/portal/sign-up(.*)',
]);

const clerkConfigured =
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.startsWith('pk_') &&
  !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.includes('REPLACE_ME');

// If Clerk keys aren't set, just inject the portal header and move on
function fallbackMiddleware(req: Request) {
  const requestHeaders = new Headers(req.headers);
  const url = new URL(req.url);
  if (url.pathname.startsWith('/portal')) {
    requestHeaders.set('x-is-portal', '1');
  }
  return NextResponse.next({ request: { headers: requestHeaders } });
}

const authMiddleware = clerkMiddleware(async (auth, req) => {
  if (isPortalRoute(req) && !isPublicPortalRoute(req)) {
    await auth.protect();
  }
  const requestHeaders = new Headers(req.headers);
  if (isPortalRoute(req)) {
    requestHeaders.set('x-is-portal', '1');
  }
  return NextResponse.next({ request: { headers: requestHeaders } });
});

export default clerkConfigured ? authMiddleware : fallbackMiddleware;

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
