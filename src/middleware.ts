import { convexAuthNextjsMiddleware, createRouteMatcher } from "@convex-dev/auth/nextjs";
import { isBypassRoutes } from "./lib/permissions";


const BypassMatcher = createRouteMatcher(isBypassRoutes);
 
export default convexAuthNextjsMiddleware(async (request, { convexAuth }) => {
    if(BypassMatcher(request)) return;
    const authed = await convexAuth.isAuthenticated();
});
 
export const config = {
  // The following matcher runs middleware on all routes
  // except static assets.
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};