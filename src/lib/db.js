import Surreal from 'surrealdb.js';
import { writable, get } from 'svelte/store';

function createDb() {
	const { subscribe, update, set } = writable({ email: '', token: '', NS: '', DB: '', SC: '' });
	const srdb = new Surreal('https://zero-app.fly.dev/rpc');

	return {
		subscribe,

		async signup(creds) {
			let u = { email: '', token: '', NS: '', DB: '', SC: '' };
			try {
				console.info('signup called');
				let token = await srdb.signup(creds);
				u = { email: creds.email, token: token, NS: creds.NS, DB: creds.DB, SC: creds.SC };
				set(u);
				console.info('signup done', u);
			} catch (e) {
				console.error('signup error', e);
			}
		},
		async signin(creds) {
			console.info('signin called');
			let u = { email: '', token: '', NS: '', DB: '', SC: '' };
			try {
				let token = await srdb.signin(creds);
				u = { email: creds.email, token: token, NS: creds.NS, DB: creds.DB, SC: creds.SC };
				set(u);
				console.info('signin done', u);
			} catch (e) {
				console.error('signin error', e);
			}
		},
		async signout() {
			let u = { email: '', token: '', NS: '', DB: '', SC: '' };
			try {
				console.info('signout called');
				await srdb.invalidate();
				set(u);
				console.info('signout done', u);
			} catch (e) {
				console.error('signout error', e);
			}
		},

		async authenticate() {
			try {
				console.info('authenticate called');
				await srdb.authenticate(get(this).token);
				console.info('authenticate done');
			} catch (e) {
				console.error('authenticate error', e);
			}
		},

		srdb
	};
}

export const db = createDb();
