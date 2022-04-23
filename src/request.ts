import { Response } from "node-fetch";

const fetch = require("node-fetch")

// TODO: Handling RateLimit

/**
 * @param endpoint {String}
 * @param method {Method}
 * @param auth {String} the api key will be used in authorization header
 */
export function makeRequest(endpoint: String, method: Method, auth: String): Promise<Response> {
	return fetch(`https://api.heroku.com${endpoint}`, {
		method,
		headers: {
			Authorization: `Bearer ${auth}`,
			Accept: `application/vnd.heroku+json; version=3`,
		}
	})
}

type Method = "get" | "post" | "head" | "delete" | "patch"