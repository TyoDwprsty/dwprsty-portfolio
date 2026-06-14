import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Only check auth for /admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Not logged in → redirect to login
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }

    // Logged in but wrong email → redirect to home
    const authorizedEmails = (
      process.env.ADMIN_EMAILS ?? "dwiprasetyo1103id@gmail.com,prasetyo1103id@gmail.com"
    ).split(",");

    if (!user.email || !authorizedEmails.includes(user.email)) {
      const url = request.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  // If already logged in and visiting /login, send straight to /admin
  if (request.nextUrl.pathname === "/login") {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const authorizedEmails = (
        process.env.ADMIN_EMAILS ?? "dwiprasetyo1103id@gmail.com,prasetyo1103id@gmail.com"
      ).split(",");
      if (user.email && authorizedEmails.includes(user.email)) {
        const url = request.nextUrl.clone();
        url.pathname = "/admin";
        return NextResponse.redirect(url);
      }
    }
  }

  return supabaseResponse;
}
