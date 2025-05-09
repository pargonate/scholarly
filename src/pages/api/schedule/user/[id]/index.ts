//
// SUPABASE SCHEDULE COURSE ENROLLMENT
//	Students can pick and choose courses from the courses page. Once
//	they choose their course, they call the protected API endpoint 
// 	(students only) to enroll that course into their schedule.
//

import type { APIRoute } from "astro";
import { supabase } from "../../../../../lib/supabase";

export const POST: APIRoute = async ({ params, request }) => {
	const userID = params.id;

	// If no ID is provided, cancel the request
	if (!userID) {
		return new Response(JSON.stringify({error: 'userID is required'}), {
			status: 400,
		});
	}

	const courseData = await request.json();
	const course = await supabase.from("schedules").insert({
		user_id: userID,
		course_id: courseData.course_id
	}).select();
 
	return new Response(JSON.stringify(course), {
		status: 200,
		headers: {
			'Content-Type': 'application/json'
		}
	});
}

export const GET: APIRoute = async ({ params, request }) => {
	const userID = params.id;

	// If no ID is provided, cancel the request
	if (!userID) {
		return new Response(JSON.stringify({error: 'userID is required'}), {
			status: 400,
		});
	}

	const course = await supabase.from("schedules").select("*").eq("user_id", userID);

	return new Response(JSON.stringify(course), {
		status: 200,
		headers: {
			'Content-Type': 'application/json'
		}
	});
}