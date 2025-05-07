//
// SUPABASE SCHEDULE COURSE DROPPER
//	When a students wants to drop a course from their schedule,
//	this protected API endpoint (only for students) allows them
//	to easily drop the course with no admin/teacher intervention.
//

import type { APIRoute } from "astro";
import { supabase } from "../../../../../../../lib/supabase";

export const DELETE: APIRoute = async({ params, request }) => {
	const courseID = params.id;

	// If no ID is provided, cancel the request
	if (!courseID) {
		return new Response(JSON.stringify({error: 'courseID is required'}), {
			status: 400,
		});
	}
	
	const course = await supabase.from("schedules").delete().eq('course_id', courseID);

	return new Response(JSON.stringify(course), {
		status: 200,
		headers: {
			'Content-Type': 'application/json'
		}
	})
}