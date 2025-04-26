//
// SUPABASE SIGN OUT
//	When the user is finished with their session, they can
//	(at any time) sign out and kills the tokens and cookies 
//	allowing them a valid session. 
//

import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ cookies, redirect }) => {
	cookies.delete("sb-access-token", { path: "/" });
	cookies.delete("sb-refresh-token", { path: "/" });
	return redirect("/signin");
}