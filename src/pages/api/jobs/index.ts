import type { APIRoute } from "astro";
import { XataClient } from "../../../xata";

const xata = new XataClient({
	apiKey: import.meta.env.XATA_API_KEY,
	branch: import.meta.env.XATA_BRANCH
});

export async function GET({}) {
	try {
		const jobs = await xata.db.courses.getAll();

		return new Response(JSON.stringify({jobs}), {
			status: 200,
			headers: {
				'Content-Type': 'application/json',
			}
		});
	} catch (error) {
		alert(error);
	}
}