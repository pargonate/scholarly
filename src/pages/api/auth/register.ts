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

	const { error: signUpError } = await supabase.auth.signUp({
		email,
		password,
		options: {
			data: {
				first_name: firstName,
				last_name: lastName,
			},
		},
	});

	if (signUpError) {
		return new Response(signUpError.message, {status: 500});
	}

	// To ensure security, we place the role outside of the user's raw_user_meta_data 
	// as that can be changed via Curl or Postman (but first we gotta get the user.id)

	const { data } = await supabase.auth.getUser();

	const { error: roleError } = await supabase.from("user_roles").insert({
		id: data.user.id,
		role: role
	});

	if (roleError) {
		return new Response(roleError.message, {status: 500});
	}

	return redirect("/login");
}