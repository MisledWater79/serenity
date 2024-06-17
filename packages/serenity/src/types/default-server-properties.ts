interface DefaultServerProperties {
	"server-name": string;
	"server-address": string;
	"server-port": number;
	"server-tps": number;
	"server-shutdown-message": string;
	"max-players": number;
	"network-comression-threshold": number;
	"network-compression-algorithm": string;
	"network-packets-per-frame": number;
	"plugins-enabled": boolean;
	"plugins-path": string;
	"worlds-default": string;
	"worlds-default-provider": string;
	"worlds-path": string;
	"debug-logging": boolean;
	"must-accept-packs": boolean;
	"resource-packs": Array<{
		uuid: string;
		subpack?: string;
	}>;
}

export { DefaultServerProperties };
