import migrate from './sqlite/migrate.js';

/** @type {import('@sveltejs/kit').ServerInit} */
export async function init() {
	// Only run migrations in development or when explicitly enabled
	// Skip during Cloudflare Pages build process
	if (process.env.NODE_ENV === 'development' || process.env.RUN_MIGRATIONS === 'true') {
		migrate();
	}
}

/** @type {import('@sveltejs/kit').Handle} */
export const handle = async ({ event, resolve }) => {
	event.locals.user = 'Admin';

	// TODO: Implement user authentication and authorization logic here.
	// event.locals.user = await getUserInformation(event.cookies.get('sessionid'));
	const response = await resolve(event);
	console.log('server hook just ran...');
	return response;
};
