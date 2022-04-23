export type Account = {
	allow_tracking: boolean,
	beta: boolean,
	country_of_residence?: string,
	created_at: DateTime,
	default_organization?: BaseTeam,
	default_team?: BaseTeam,
	delinquent_at?: DateTime,
	email: string,
	federated: boolean,
	id: UUID,
	identity_provider?: IdentityProvider,
	last_login?: DateTime,
	name?: string,
	sms_number?: string,
	suspended_at?: DateTime,
	two_factor_authentication: boolean,
	updated_at?: DateTime,
	verified: boolean
}

export type IdentityProvider = {
	id: UUID,
	name: string,
	organization: {
		name: string
	},
	team: {
		name: string
	},
	owner: {
		id: UUID,
		name: string,
		type: "team" | "enterprise-account"
	}
}

export type BaseTeam = {
	id: UUID,
	name: string,
}

export type Team = BaseTeam & {
	// TODO: finished team
}

export type DateTime = string
export type UUID = string