//
// SUPABASE ACCOUNT REGISTRATION
//	With new users, we need a place for them to create accounts to 
//	access Scholarly. Thus, we need a POST route to create an account
//	with desired fields (username, password, and role).
//

import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";

export const POST: APIRoute = async ({ request, redirect }) => {
	const formData = await request.formData();
	const email = formData.get("email")?.toString();
	const firstName = formData.get("firstName")?.toString();
	const lastName = formData.get("lastName")?.toString();
	const password = formData.get("password")?.toString();
	const role = formData.get("role-dropdown")?.toString();

	if (!firstName || !lastName || !role || !email || !password) {
		return new Response("First Name, Last Name, Role, Email, and Password are required!", {status: 400});
	}

	const { error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			data: {
				first_name: firstName,
				last_name: lastName,
				role: role
			},
		},
	});

	if (error) {
		return new Response(error.message, {status: 500});
	}

	return redirect("/login");
}