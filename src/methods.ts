import {
	Account,
	APIToken,
	App, BatchUpdateFormation,
	CreateDynoOptions,
	Dyno,
	Formation,
	PartialApp,
	Region,
	Stack,
	Team, UpdateFormation,
	UUID
} from "./types";
import { makeRequest } from "./request";

/**
 * @description get heroku account
 * @param auth {APIToken?} heroku api token
 * @returns {Account}
 */
export function getAccount(auth?: APIToken): Promise<Account> {
	return makeRequest('/account', 'get', auth)
}

/**
 * @description create an app
 * @param name {string} name for app to create
 * @param region {string} heroku region `id` or `name` (by using `getRegions` method to resolve)
 * @param stack {string} heroku stack `id` or `name` (by using `getStacks` method to resolve)
 * @param auth {APIToken?} heroku api token
 * @returns {App}
 */
export function createApp(name: string, region: string, stack: string, auth?: APIToken): Promise<App> {
	return makeRequest('/apps', 'post', auth, {
		name, region, stack
	})
}

/**
 * @description delete an app
 * @param name {string} name for app to delete
 * @param auth {APIToken?} heroku api token
 * @returns {App}
 */
export function deleteApp(name: string, auth?: APIToken): Promise<App> {
	return makeRequest(`/apps/${name}`, 'delete', auth)
}

/**
 * @description Enable ACM flag for an app
 * @param name {string} name for app to modify
 * @param auth {APIToken?} heroku api token
 * @returns {App}
 */
export function enableAppAcm(name: string, auth?: APIToken): Promise<App> {
	return makeRequest(`/apps/${name}/acm`, 'post', auth)
}

/**
 * @description Disable ACM flag for an app
 * @param name {string} name for app to modify
 * @param auth {APIToken?} heroku api token
 * @returns {App}
 */
export function disableAppAcm(name: string, auth?: APIToken): Promise<App> {
	return makeRequest(`/apps/${name}/acm`, 'delete', auth)
}

/**
 * @description Enable or Disable ACM flag for an app
 * @param name {string} name for app to modify
 * @param acm {boolean} whether to enable or not
 * @param auth {APIToken?} heroku api token
 * @returns {App}
 */
export function updateAppAcm(name: string, acm: boolean, auth?: APIToken): Promise<App> {
	return acm ? enableAppAcm(name, auth) : disableAppAcm(name, auth)
}

/**
 * @description Refresh ACM for an app
 * @param name {string} name for app to modify
 * @param auth {APIToken?} heroku api token
 * @returns {App}
 */
export function refreshAppAcm(name: string, auth?: APIToken): Promise<App> {
	return makeRequest(`/apps/${name}/acm`, 'patch', auth)
}

/**
 * @description Create a new dyno.
 * @param app {App|string} app resolvable to create dyno
 * @param options {CreateDynoOptions} options
 * @param auth {APIToken?} heroku api token
 * @returns {Dyno}
 */
export function createDyno(app: App | string, options: CreateDynoOptions, auth?: APIToken): Promise<Dyno> {
	app = (app as App).id || app

	return makeRequest(`/apps/${app}/dynos`, 'post', auth, options)
}

/**
 * @description Restart dyno.
 * @param app {App|string} app resolvable
 * @param dyno {Dyno|string} dyno resolvable to restart. If not provided, all dynos will be restart
 * @param auth {APIToken?} heroku api token
 */
export function restartDyno(app: App | string, dyno?: Dyno | string, auth?: APIToken) {
	app = (app as App).id || app
	dyno = (dyno as Dyno).id || dyno

	if(!dyno)
		return restartAllDynos(app, auth)

	return makeRequest(`/apps/${app}/dynos/${dyno}`, 'delete', auth, null, false)
}

/**
 * @description Restart all dynos.
 * @param app {App|string} app resolvable
 * @param auth {APIToken?} heroku api token
 */
export function restartAllDynos(app: App | string, auth?: APIToken) {
	app = (app as App).id || app

	return makeRequest(`/apps/${app}/dynos`, 'delete', auth, null, false)
}

/**
 * @description Stop dyno.
 * @param app {App|string} app resolvable
 * @param dyno {Dyno|string} dyno resolvable to stop.
 * @param auth {APIToken?} heroku api token
 */
export function stopDyno(app: App | string, dyno: Dyno | string, auth?: APIToken) {
	app = (app as App).id || app
	dyno = (dyno as Dyno).id || dyno

	return makeRequest(`/apps/${app}/dynos/${dyno}/actions/stop`, 'post', auth, null, false)
}

/**
 * @description Info for existing dyno.
 * @param app {App|string} app resolvable
 * @param dyno {Dyno|string} dyno resolvable to stop.
 * @param auth {APIToken?} heroku api token
 * @returns {Dyno}
 */
export function getDyno(app: App | string, dyno: Dyno | string, auth?: APIToken): Promise<Dyno> {
	app = (app as App).id || app
	dyno = (dyno as Dyno).id || dyno

	return makeRequest(`/apps/${app}/dynos/${dyno}`, 'get', auth)
}

/**
 * @description List existing dynos.
 * @param app {App|string} app resolvable
 * @param auth {APIToken?} heroku api token
 * @returns {Dyno[]}
 */
export function getDynos(app: App | string, auth?: APIToken): Promise<Dyno[]> {
	app = (app as App).id || app

	return makeRequest(`/apps/${app}/dynos`, 'get', auth)
}

/**
 * @description Update an existing app.
 * @param name {string} name for app to update
 * @param options {Partial<PartialApp>} options to update
 * @param auth {APIToken?} heroku api token
 * @returns {App}
 */
export function updateApp(name: string, options: Partial<PartialApp>, auth?: APIToken): Promise<App> {
	return makeRequest(`/apps/${name}`, 'patch', auth, options)
}

/**
 * @description List owned and collaborated apps (excludes team apps).
 * @param email {string} owner's email
 * @param auth {APIToken?} heroku api token
 * @returns {App}
 */
export function getAppsByEmail(email: string, auth?: APIToken): Promise<App> {
	return makeRequest(`/users/${email}/apps`, 'get', auth)
}

/**
 * @description get an app info
 * @param name {string} app name
 * @param auth {APIToken?} heroku api token
 * @returns {App}
 */
export function getApp(name: string, auth?: APIToken): Promise<App> {
	return makeRequest(`/apps/${name}`, 'get', auth)
}

/**
 * @description get all apps available
 * @param auth {APIToken?} heroku api token
 * @returns {App[]}
 */
export function getApps(auth?: APIToken): Promise<App[]> {
	return makeRequest('/apps', 'get', auth)
}

/**
 * @description get all available regions
 * @param auth {APIToken?} heroku api token
 * @returns {Region[]}
 */
export function getRegions(auth?: APIToken): Promise<Region> {
	return makeRequest('/regions', 'get', auth)
}

/**
 * @description get region info
 * @param name {string} region name or id
 * @param auth {APIToken?} heroku api token
 * @returns {Region}
 */
export function getRegion(name: string, auth?: APIToken): Promise<Region> {
	return makeRequest(`/region/${name}`, 'get', auth)
}

/**
 * @description get available stacks
 * @param auth {APIToken?} heroku api token
 * @returns {Stack[]}
 */
export function getStacks(auth?: APIToken): Promise<Stack[]> {
	return makeRequest(`/stacks/`, 'get', auth)
}

/**
 * @description get stack info
 * @param name {string} stack name or id
 * @param auth {APIToken?} heroku api token
 * @returns {Stack}
 */
export function getStack(name: string, auth?: APIToken): Promise<Stack> {
	return makeRequest(`/stacks/${name}`, 'get', auth)
}

/**
 * @description get available teams
 * @param auth {APIToken?} heroku api token
 * @returns {Team[]}
 */
export function getTeams(auth?: APIToken): Promise<Team[]> {
	return makeRequest(`/teams`, 'get', auth)
}

/**
 * @description get team info
 * @param name {string} team name or id
 * @param auth {APIToken?} heroku api token
 * @returns {Team}
 */
export function getTeam(name: string, auth?: APIToken): Promise<Team> {
	return makeRequest(`/stacks/${name}`, 'get', auth)
}

/**
 * @description Info for a process type
 * @param app {App|string} app resolvable
 * @param formation {UUID|string} formation id or type name
 * @param auth {APIToken?} heroku api token
 * @returns {Formation}
 */
export function getFormationInfo(app: App | string, formation: UUID | string, auth?: APIToken): Promise<Formation> {
	app = (app as App).id || app

	return makeRequest(`/apps/${app}/formation/${formation}`, 'get', auth)
}

/**
 * @description List process type formation
 * @param app {App|string} app resolvable
 * @param auth {APIToken?} heroku api token
 * @returns {Formation[]}
 */
export function getFormationList(app: App | string, auth?: APIToken): Promise<Formation[]> {
	app = (app as App).id || app

	return makeRequest(`/apps/${app}`, 'get', auth)
}

/**
 * @description Batch update process types
 * @param app {App|string} app resolvable
 * @param updates {BatchUpdateFormation[]} updated formations
 * @param auth {APIToken?} heroku api token
 * @returns {Formation[]}
 */
export function updateFormations(app: App | string, updates: BatchUpdateFormation[], auth?: APIToken): Promise<Formation[]> {
	app = (app as App).id || app

	return makeRequest(`/apps/${app}/formation`, 'patch', auth, updates)
}

/**
 * @description Update process type
 * @param app {App|string} app resolvable
 * @param formation {Formation|string} formation to be updated
 * @param update {UpdateFormation} updated formation
 * @param auth {APIToken?} heroku api token
 * @returns {Formation}
 */
export function updateFormation(app: App | string, formation: Formation | string, update: UpdateFormation, auth?: APIToken): Promise<Formation> {
	app = (app as App).id || app
	formation = (formation as Formation).id || formation

	return makeRequest(`/apps/${app}/formation/${formation}`, 'patch', auth, update)
}