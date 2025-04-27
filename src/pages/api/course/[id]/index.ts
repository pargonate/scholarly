//
// SUPABASE COURSE MODIFICATION
//
//

import type { APIRoute } from "astro";
import { supabase } from "../../../../lib/supabase";

export const POST: APIRoute = async ({ params, request }) => {
	const courseID = params.id;

	// If no ID is provided, cancel the request
	if (!courseID) {
		return new Response(JSON.stringify({error: 'courseID is required'}), {
			status: 400,
		});
	}

	const courseData = await request.json();
	const course = await supabase.from("courses").insert({
		creator_id: courseData.creator_id,
		creator_name: courseData.creator_name,
		course_id: courseID, 
		name: courseData.name,
		description: courseData.description,
		subject: courseData.subject,
		credits: courseData.credits
	}).select();
 
	return new Response(JSON.stringify(course), {
		status: 200,
		headers: {
			'Content-Type': 'application/json'
		}
	});
}

export const GET: APIRoute = async ({ params, request }) => {
	const courseID = params.id;

	// If no ID is provided, cancel the request
	if (!courseID) {
		return new Response(JSON.stringify({error: 'courseID is required'}), {
			status: 400,
		});
	}

	const course = supabase.from("courses").select('course_id').eq("course_id", courseID);

	return new Response(JSON.stringify(course), {
		status: 200,
		headers: {
			'Content-Type': 'application/json'
		}
	});
}