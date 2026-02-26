import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPortalRoute = createRouteMatcher(['/portal(.*)']);
const isPublicPortalRoute = createRouteMatcher([
  '/portal/sign-in(.*)',
  '/portal/sign-up(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  // Protect all portal routes except sign-in/sign-up
  if (isPortalRoute(req) && !isPublicPortalRoute(req)) {
    await auth.protect();
  }

  // Inject x-is-portal header so root layout can hide Nav/Footer
  const requestHeaders = new Headers(req.headers);
  if (isPortalRoute(req)) {
    requestHeaders.set('x-is-portal', '1');
  }

  return NextResponse.next({ request: { headers: requestHeaders } });
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
