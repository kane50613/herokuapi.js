import fetch from "node-fetch";

// TODO: Handling RateLimit

/**
 * @param endpoint {String}
 * @param method {Method}
 * @param auth {String?} the api key will be used in authorization header default set to `HEROKU_API_KEY`
 * @param body request body
 * @param json {boolean} whether returning json parsed body
 */
export async function makeRequest(endpoint: String, method: Method, auth?: String, body?: any, json: boolean = true): Promise<any> {
	const response = await fetch(`https://api.heroku.com${endpoint}`, {
		method,
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${auth || process.env.HEROKU_API_KEY}`,
			Accept: `application/vnd.heroku+json; version=3`,
		},
		body: typeof body === "object" ? JSON.stringify(body) : body
	})

	return json ? await response.json() : response
}

type Method = "get" | "post" | "head" | "delete" | "patch"