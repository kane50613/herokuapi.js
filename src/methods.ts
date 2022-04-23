import { Account } from "./types";
import { makeRequest } from "./request";

/**
 * get heroku account
 * @param auth {String}
 * @returns Account
 */
export async function getAccount(auth: String): Promise<Account> {
	return makeRequest('/account', 'get', auth).then(r => r.json()) as Promise<Account>
}