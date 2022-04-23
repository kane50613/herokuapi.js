export type Account = {
	allow_tracking: boolean,
	beta: boolean,
	country_of_residence?: string,
	created_at: DateTime,
	default_organization?: Base,
	default_team?: Base,
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
	owner: Base & {
		type: AccountType
	}
}

export type App = {
	acm: boolean,
	archived_at?: DateTime,
	build_stack: Base,
	buildpack_provided_description?: string,
	created_at: DateTime,
	git_url: string,
	id: UUID,
	internal_routing: boolean,
	maintenance: boolean,
	name: string,
	organization: Base,
	owner: {
		email: string,
		id: UUID
	},
	region: Base,
	released_at?: DateTime,
	repo_size?: number,
	slug_size?: number,
	space: BaseSpace,
	stack: Base,
	team: Base,
	updated_at: DateTime,
	web_url: string
}

export type Base = {
	id: UUID,
	name: string,
}

export type BaseSpace = Base & {
	shield: boolean
}

export type Stack = Base & {
	created_at: DateTime,
	default: boolean,
	state: string,
	updated_at: DateTime
}

export type Team = Base & {
	created_at: DateTime,
	credit_card_collections: boolean,
	default: boolean,
	enterprise_account?: Base,
	identity_provider: IdentityProvider,
	membership_limit?: number,
	provisioned_licenses: boolean,
	role?: TeamRole,
	type: AccountType,
	updated_at: DateTime
}

export type Region = Base & {
	country: string,
	created_at: DateTime,
	description: string,
	locale: string,
	private_capable: boolean,
	provider: {
		name: string,
		region: string
	},
	updated_at: DateTime
}

export type AccountType = "team" | "enterprise-account"
export type TeamRole = "admin" | "collaborator" | "member" | "owner" | null

export type APIToken = string
export type DateTime = string
export type UUID = string