// Type definitions for uuid v2.0.3
// Project: https://github.com/defunctzombie/node-uuid
// Definitions by: Oliver Hoffmann <https://github.com/iamolivinius/>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare namespace uuid {
	interface V1Options {
		node?: number[];
		clockseq?: number;
		msecs?: number | Date;
		nsecs?: number;
	}

	type V4Options = { random: number[] } | { rng: () => number[]; }

	interface UuidStatic {
		(options?: V4Options): string;
		(options: V4Options | null, buffer: number[], offset?: number): number[];

		v1(options?: V1Options): string;
		v1(options: V1Options | null, buffer: number[], offset?: number): number[];
		v4: UuidStatic;
		parse(id: string): number[];
		parse(id: string, buffer: number[], offset?: number): number[];
	}
}

declare const uuid: uuid.UuidStatic
export = uuid
