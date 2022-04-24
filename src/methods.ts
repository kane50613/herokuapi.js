import { Account, APIToken, App, CreateDynoOptions, Dyno, PartialApp, Region, Stack, Team } from "./types";
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
 * @description Enable ACM flag for an app
 * @param auth {APIToken} heroku api token
 * @param name {string} name for app to modify
 */
export function enableAppAcm(auth: string, name: string): Promise<App> {
	return makeRequest(`/apps/${name}/acm`, 'post', auth)
}

/**
 * @description Disable ACM flag for an app
 * @param auth {APIToken} heroku api token
 * @param name {string} name for app to modify
 */
export function disableAppAcm(auth: string, name: string): Promise<App> {
	return makeRequest(`/apps/${name}/acm`, 'delete', auth)
}

/**
 * @description Enable or Disable ACM flag for an app
 * @param auth {APIToken} heroku api token
 * @param name {string} name for app to modify
 * @param acm {boolean} whether to enable or not
 */
export function updateAppAcm(auth: APIToken, name: string, acm: boolean): Promise<App> {
	return acm ? enableAppAcm(auth, name) : disableAppAcm(auth, name)
}

/**
 * @description Refresh ACM for an app
 * @param auth {APIToken} heroku api token
 * @param name {string} name for app to modify
 */
export function refreshAppAcm(auth: APIToken, name: string): Promise<App> {
	return makeRequest(`/apps/${name}/acm`, 'patch', auth)
}

/**
 * @description Create a new dyno.
 * @param auth {APIToken} heroku api token
 * @param app {App|string} app resolvable to create dyno
 * @param options {CreateDynoOptions} options
 */
export function createDyno(auth: APIToken, app: App | string, options: CreateDynoOptions): Promise<Dyno> {
	app = (app as App).id || app

	return makeRequest(`/apps/${app}/dynos`, 'post', auth, options)
}

/**
 * @description Restart dyno.
 * @param auth {APIToken} heroku api token
 * @param app {App|string} app resolvable
 * @param dyno {Dyno|string} dyno resolvable to restart. If not provided, all dynos will be restart
 */
export function restartDyno(auth: APIToken, app: App | string, dyno?: Dyno | string) {
	app = (app as App).id || app
	dyno = (dyno as Dyno).id || dyno

	if(!dyno)
		return restartAllDynos(auth, app)

	return makeRequest(`/apps/${app}/dynos/${dyno}`, 'delete', auth, null, false)
}

/**
 * @description Restart all dynos.
 * @param auth {APIToken} heroku api token
 * @param app {App|string} app resolvable
 */
export function restartAllDynos(auth: APIToken, app: App | string) {
	app = (app as App).id || app

	return makeRequest(`/apps/${app}/dynos`, 'delete', auth, null, false)
}

/**
 * @description Stop dyno.
 * @param auth {APIToken} heroku api token
 * @param app {App|string} app resolvable
 * @param dyno {Dyno|string} dyno resolvable to stop.
 */
export function stopDyno(auth: APIToken, app: App | string, dyno: Dyno | string) {
	app = (app as App).id || app
	dyno = (dyno as Dyno).id || dyno

	return makeRequest(`/apps/${app}/dynos/${dyno}/actions/stop`, 'post', auth, null, false)
}

/**
 * @description Info for existing dyno.
 * @param auth {APIToken} heroku api token
 * @param app {App|string} app resolvable
 * @param dyno {Dyno|string} dyno resolvable to stop.
 */
export function getDyno(auth: APIToken, app: App | string, dyno: Dyno | string) {
	app = (app as App).id || app
	dyno = (dyno as Dyno).id || dyno

	return makeRequest(`/apps/${app}/dynos/${dyno}`, 'get', auth)
}

/**
 * @description List existing dynos.
 * @param auth {APIToken} heroku api token
 * @param app {App|string} app resolvable
 */
export function getDynos(auth: APIToken, app: App | string) {
	app = (app as App).id || app

	return makeRequest(`/apps/${app}/dynos`, 'get', auth)
}

/**
 * @description Update an existing app.
 * @param auth {APIToken} heroku api token
 * @param name {string} name for app to update
 * @param options {Partial<PartialApp>} options to update
 */
export function updateApp(auth: APIToken, name: string, options: Partial<PartialApp>): Promise<App> {
	return makeRequest(`/apps/${name}`, 'patch', auth, options)
}

/**
 * @description List owned and collaborated apps (excludes team apps).
 * @param auth {APIToken} heroku api token
 * @param email {string} owner's email
 * @returns {App}
 */
export function getAppsByEmail(auth: APIToken, email: string): Promise<App> {
	return makeRequest(`/users/${email}/apps`, 'get', auth)
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