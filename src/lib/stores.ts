import { writable, type Writable } from "svelte/store";

export type Sponsor = {
    name: string;
    time: number;
}

export const sponsors: Writable<Array<Sponsor>> = writable([]);