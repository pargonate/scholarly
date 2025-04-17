//
// BACKEND API (Astro SSR x xata)
//	Through the power of Astro's APIRouter (via Server-Side Rendering) 
//	and xata's methods, I can handle all four types of routes 
//	(POST + PUT, GET, and DELETE) through establishing a client and 
//	routes that can then be called within any Astro script via the 
//	fetch() API. 
// 

import type { APIRoute } from "astro";
import { XataClient } from "../../../../xata";

const xata = new XataClient({
	apiKey: import.meta.env.XATA_API_KEY,
	branch: import.meta.env.XATA_BRANCH
});

// Acts like a POST and PUT, where xata handles already created courses (PUT/UPDATE)
export const POST: APIRoute = async({ params, request }) => {
	const courseID = params.id;

	// If no ID is provided, cancel the request
	if (!courseID) {
		return new Response(JSON.stringify({error: 'courseID is required'}), {
			status: 400,
		});
	}

	const courseData = await request.json();
	const course = await xata.db.courses.createOrUpdate(courseID, courseData);
	return new Response(JSON.stringify(course), {
		status: 200,
		headers: {
			'Content-Type': 'application/json'
		}
	});
}

export const DELETE: APIRoute = async({ params, request }) => {
	const courseID = params.id;

	// If no ID is provided, cancel the request
	if (!courseID) {
		return new Response(JSON.stringify({error: 'courseID is required'}), {
			status: 400,
		});
	}

	const deletedCourse = await xata.db.courses.delete(courseID);
	return new Response(JSON.stringify(deletedCourse), {
		status: 200,
		headers: {
			'Content-Type': 'applications/json'
		}
	});
}

export const GET: APIRoute = async ({params, request}) => {
	const courseID = params.id;

	// If no ID is provided, cancel the request
	if (!courseID) {
		return new Response(JSON.stringify({error: 'courseID is required'}), {
			status: 400,
		});
	}

	const course = await xata.db.courses.read(courseID);
	return new Response(JSON.stringify(course), {
		status: 200,
		headers: {
			'Content-Type': 'applications/json'
		}
	});
}