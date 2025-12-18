import { DatabaseSync } from 'node:sqlite';
import { env as private_env } from "$env/dynamic/private";

let db = null;

function getDb() {
	if (!db) {
		const DB_PATH = private_env.DB_PATH || './data/db.sqlite';
		// Only initialize database in development or when explicitly needed
		// Skip during Cloudflare Pages build process
		if (process.env.NODE_ENV === 'development' || process.env.RUN_MIGRATIONS === 'true') {
			db = new DatabaseSync(DB_PATH, {
				// enableForeignKeyConstraints: true
			});
		} else {
			// For production/static builds, return a mock database
			db = {
				exec: () => {},
				prepare: () => ({ get: () => null, run: () => {}, all: () => [] })
			};
		}
	}
	return db;
}

export default getDb();
