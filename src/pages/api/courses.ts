//
// SUPABASE COURSE RETRIEVAL (Astro SSR API)
//	Due to Supabase serving me both a auth solution AND a
//	database, we'll use their database service to store
//	all the courses. We establish a GET Route to get the 
//	whole table.
//

import type { APIRoute } from "astro";
import { supabase } from "../../lib/supabase";

export const GET: APIRoute = async () => {
	const { data, error } = await supabase.from("courses").select("*");

	if (error) {
		return new Response(
			JSON.stringify({
			  error: error.message,
			}),
			{ status: 500 },
		);
	}

	return new Response(JSON.stringify(data));
};