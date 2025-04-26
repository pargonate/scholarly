/// <reference types="astro/client" />
/// <reference types="@clerk/astro/env"/>

interface ImportMetaEnv {
	readonly XATA_API_KEY: string;
	readonly XATA_BRANCH?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}