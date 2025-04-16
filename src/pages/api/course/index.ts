//
// API RETRIEVAL (Astro SSR x xata)
//	Using the power of Astro's Server-Side Rendering, we can execute
//	xata to backend requests directed by custom parameters. Simply by 
//	first setting up the xata client and Astro's SSR APIRoute can be 
//	used to create endpoints at will.
//

import type { APIRoute } from "astro";
import { XataClient } from "../../../xata";

const xata = new XataClient({
	apiKey: import.meta.env.XATA_API_KEY,
	branch: import.meta.env.XATA_BRANCH
});

//
// POST
//

export const POST: APIRoute = async({ request }) => {
	const courseData = await request.json();
	const course = await xata.db.courses.create(courseData);
	return new Response(JSON.stringify(course), {
		status: 200,
		headers: {
			'Content-Type': 'application/json'
		}
	});
}

//
// GET
//

export async function GET({}) {
	try {
		const request = await xata.db.courses.getAll();

		return new Response(JSON.stringify({request}), {
			status: 200,
			headers: {
				'Content-Type': 'application/json',
			}
		});
	} catch (error) {
		return new Response(JSON.stringify({error}), {
			status: 500,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}
}