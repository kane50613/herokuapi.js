import { Account, APIToken, App, Region, Stack, Team } from "./types";
import { makeRequest } from "./request";

/**
 * @description get heroku account
 * @param auth {APIToken} heroku api token
 * @returns {Account}
 */
export function getAccount(auth: APIToken): Promise<Account> {
	return makeRequest('/account', 'get', auth)
}

/**
 * @description create an app
 * @param auth {APIToken} heroku api token
 * @param name {string} name for app to create
 * @param region {string} heroku region `id` or `name` (by using `getRegions` method to resolve)
 * @param stack {string} heroku stack `id` or `name` (by using `getStacks` method to resolve)
 * @returns {App}
 */
export function createApp(auth: APIToken, name: string, region: string, stack: string): Promise<App> {
	return makeRequest('/apps', 'post', auth, {
		name, region, stack
	})
}

/**
 * @description delete an app
 * @param auth {APIToken} heroku api token
 * @param name {string} name for app to delete
 */
export function deleteApp(auth: APIToken, name: string): Promise<App> {
	return makeRequest(`/apps/${name}`, 'delete', auth)
}

/**
 * @description get an app info
 * @param auth {APIToken} heroku api token
 * @param name {string} app name
 * @returns {App}
 */
export function getApp(auth: APIToken, name: string): Promise<App> {
	return makeRequest(`/apps/${name}`, 'get', auth)
}

/**
 * @description get all apps available
 * @param auth {APIToken} heroku api token
 * @returns {App[]}
 */
export function getApps(auth: APIToken): Promise<App[]> {
	return makeRequest('/apps', 'get', auth)
}

/**
 * @description get all available regions
 * @param auth {APIToken} heroku api token
 * @returns {Region[]}
 */
export function getRegions(auth: APIToken): Promise<Region> {
	return makeRequest('/regions', 'get', auth)
}

/**
 * @description get region info
 * @param auth {APIToken} heroku api token
 * @param name {string} region name or id
 * @returns {Region}
 */
export function getRegion(auth: APIToken, name: string): Promise<Region> {
	return makeRequest(`/region/${name}`, 'get', auth)
}

/**
 * @description get available stacks
 * @param auth {APIToken} heroku api token
 * @returns {Stack[]}
 */
export function getStacks(auth: APIToken): Promise<Stack[]> {
	return makeRequest(`/stacks/`, 'get', auth)
}

/**
 * @description get stack info
 * @param auth {APIToken} heroku api token
 * @param name {string} stack name or id
 * @returns {Stack}
 */
export function getStack(auth: APIToken, name: string): Promise<Stack> {
	return makeRequest(`/stacks/${name}`, 'get', auth)
}

/**
 * @description get available teams
 * @param auth {APIToken} heroku api token
 * @returns {Team[]}
 */
export function getTeams(auth: APIToken): Promise<Team[]> {
	return makeRequest(`/teams`, 'get', auth)
}

/**
 * @description get team info
 * @param auth {APIToken} heroku api token
 * @param name {string} team name or id
 * @returns {Team}
 */
export function getTeam(auth: APIToken, name: string): Promise<Team> {
	return makeRequest(`/stacks/${name}`, 'get', auth)
}