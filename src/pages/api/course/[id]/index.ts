//
// API MODIFICATION (Astro SRR x xata)
//	Similar to that of the retrieval (using the APIRoute),
//	requests can be made to manipulate or completely delete
//	a course if need be (in case of mistakes or changes).
//


import type { APIRoute } from "astro";
import { XataClient } from "../../../../xata";

const xata = new XataClient({
	apiKey: import.meta.env.XATA_API_KEY,
	branch: import.meta.env.XATA_BRANCH
});

export const PUT: APIRoute = async({params, request}) => {
	const id = params.id;

	// If no ID is provided, cancel the request
	if (!id) {
		return new Response(JSON.stringify({error: '(xata) ID is required'}), {
			status: 400,
		});
	}

	const courseData = await request.json();
	const updatedCourse = await xata.db.courses.update(id, courseData);
	return new Response(JSON.stringify(updatedCourse), {
		status: 200,
		headers: {
			'Content-Type': 'applications/json'
		}
	});	
}

export const DELETE: APIRoute = async({ params, request }) => {
	const id = params.id;

	// If no ID is provided, cancel the request
	if (!id) {
		return new Response(JSON.stringify({error: '(xata) ID is required'}), {
			status: 400,
		});
	}

	const deletedCourse = await xata.db.courses.delete(id);
	return new Response(JSON.stringify(deletedCourse), {
		status: 200,
		headers: {
			'Content-Type': 'applications/json'
		}
	});
}