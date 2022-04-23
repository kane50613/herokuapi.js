import { Account } from "./types";
import { makeRequest } from "./request";

export async function getAccount(auth: String): Promise<Account> {
	return makeRequest('/account', 'get', auth).then(r => r.json()) as Promise<Account>
}