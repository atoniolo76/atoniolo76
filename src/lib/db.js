import { DatabaseSync } from 'node:sqlite';
import { env as private_env } from "$env/dynamic/private";

let db = null;

function getDb() {
	if (!db) {
		try {
			// In Cloudflare Pages, always use in-memory database
			console.log("Initializing in-memory database for Cloudflare");
			db = new DatabaseSync(':memory:', {
				// enableForeignKeyConstraints: true
			});
		} catch (error) {
			console.error("Database initialization failed:", error);
			// Fallback to mock database if SQLite fails
			db = {
				exec: () => {},
				prepare: () => ({ get: () => null, run: () => {}, all: () => [] })
			};
		}
	}
	return db;
}

export default getDb();
