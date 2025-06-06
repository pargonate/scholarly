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

	const course = await supabase.from("courses").select().eq("course_id", courseID);

	return new Response(JSON.stringify(course), {
		status: 200,
		headers: {
			'Content-Type': 'application/json'
		}
	});
}

export const PUT: APIRoute = async ({ params, request }) => {
	const courseID = params.id;

	// If no ID is provided, cancel the request
	if (!courseID) {
		return new Response(JSON.stringify({error: 'courseID is required'}), {
			status: 400,
		});
	}
	
	// Doesn't include creator_name because it would be illogical
	// to change as then it wouldn't reflect the original creator.
	const courseData = await request.json();
	const course = await supabase.from("courses").update({
		creator_id: courseData.creator_id,
		course_id: courseID, 
		name: courseData.name,
		description: courseData.description,
		subject: courseData.subject,
		credits: courseData.credits		
	}).eq('course_id', courseID);

	return new Response(JSON.stringify(course), {
		status: 200,
		headers: {
			'Content-Type': 'application/json'
		}
	});
}

export const DELETE: APIRoute = async ({ params, request }) => {
	const courseID = params.id;

	// If no ID is provided, cancel the request
	if (!courseID) {
		return new Response(JSON.stringify({error: 'courseID is required'}), {
			status: 400,
		});
	}
	
	const course = await supabase.from("courses").delete().eq('course_id', courseID);

	return new Response(JSON.stringify(course), {
		status: 200,
		headers: {
			'Content-Type': 'application/json'
		}
	})
}