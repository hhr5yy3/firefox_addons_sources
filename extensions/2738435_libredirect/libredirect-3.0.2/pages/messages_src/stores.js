import { writable } from "svelte/store"

export const options = writable(null)
export const config = writable(null)
export const page = writable("general")
