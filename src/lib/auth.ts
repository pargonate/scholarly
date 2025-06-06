import { supabase } from "../lib/supabase";

export async function protectRoute(Astro) {
	const accessToken = Astro.cookies.get("sb-access-token");
	const refreshToken = Astro.cookies.get("sb-refresh-token");

	if (!accessToken || !refreshToken) {
		return { redirect: "/login" };
	}

	try {
		const session = await supabase.auth.setSession({
			refresh_token: refreshToken.value,
			access_token: accessToken.value,
		});

		if (session.error) {
			Astro.cookies.delete("sb-access-token", { path: "/" });
			Astro.cookies.delete("sb-refresh-token", { path: "/" });
			return { redirect: "/login" };
		}

		const user = session.data.user;
		const metadata = user?.user_metadata;

		return {
			user,
			metadata
		}
		
	} catch (error) {
		Astro.cookies.delete("sb-access-token", { path: "/" });
		Astro.cookies.delete("sb-refresh-token", { path: "/" });
		return { redirect: "/login" };		
	}
}