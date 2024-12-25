// import { createServerClient } from "@supabase/ssr";
// import { NextResponse, type NextRequest } from "next/server";
// import { env } from "../env";

// export async function updateSession(request: NextRequest) {
//   let supabaseResponse = NextResponse.next({
//     request,
//   });

//   const supabase = createServerClient(
//     env.NEXT_PUBLIC_SUPABASE_URL,
//     env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
//     {
//       cookies: {
//         getAll() {
//           return request.cookies.getAll();
//         },
//         setAll(cookiesToSet) {
//           cookiesToSet.forEach(({ name, value, options }) =>
//             request.cookies.set(name, value)
//           );
//           supabaseResponse = NextResponse.next({
//             request,
//           });
//           cookiesToSet.forEach(({ name, value, options }) =>
//             supabaseResponse.cookies.set(name, value, options)
//           );
//         },
//       },
//     }
//   );

//   // IMPORTANT: Avoid writing any logic between createServerClient and
//   // supabase.auth.getUser(). A simple mistake could make it very hard to debug
//   // issues with users being randomly logged out.

//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   if (
//     !user &&
//     !request.nextUrl.pathname.startsWith("/login") &&
//     !request.nextUrl.pathname.startsWith("/auth")
//   ) {
//     // no user, potentially respond by redirecting the user to the login page
//     const url = request.nextUrl.clone();
//     url.pathname = "/login";
//     return NextResponse.redirect(url);
//   }

//   // IMPORTANT: You *must* return the supabaseResponse object as it is. If you're
//   // creating a new response object with NextResponse.next() make sure to:
//   // 1. Pass the request in it, like so:
//   //    const myNewResponse = NextResponse.next({ request })
//   // 2. Copy over the cookies, like so:
//   //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
//   // 3. Change the myNewResponse object to fit your needs, but avoid changing
//   //    the cookies!
//   // 4. Finally:
//   //    return myNewResponse
//   // If this is not done, you may be causing the browser and server to go out
//   // of sync and terminate the user's session prematurely!

//   return supabaseResponse;
// }

import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { env } from "../env";
import { getBaseUrl } from "../getBaseUrl";
import { headers } from "next/headers";

// Define the routes that require specific roles
const ADMIN_ROUTES = ["/dashboard"];
const AUTHENTICATED_ROUTES = ["/user", "/cart/checkout"];

// Helper to check if the path starts with any of the protected paths
const pathStartsWith = (pathname: string, protectedPaths: string[]) => {
  return protectedPaths.some((path) => pathname.startsWith(path));
};

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Get the user from Supabase auth
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If no user and trying to access protected route, redirect to login
  if (
    !user &&
    (pathStartsWith(request.nextUrl.pathname, ADMIN_ROUTES) ||
      pathStartsWith(request.nextUrl.pathname, AUTHENTICATED_ROUTES))
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // If user exists and trying to access protected route, check role
  if (user) {
    // Get user's profile with role information
    const response = await fetch(`${getBaseUrl()}/api/auth/user`, {
      headers: await headers(),
      cache: "no-store",
    });
    const data = await response.json();
    const profile = data?.result.profile;

    // If trying to access admin routes but not an admin, redirect to home
    if (
      pathStartsWith(request.nextUrl.pathname, ADMIN_ROUTES) &&
      profile?.role !== "ADMIN"
    ) {
      const url = request.nextUrl.clone();
      url.pathname = "/"; // or to an "unauthorized" page
      return NextResponse.redirect(url);
    }
  }

  return response;
}
