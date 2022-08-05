/**
 * @copyright 2022. ya-ilya
 */

import {writeFileSync} from "fs";

export class Json {
    private path: string

    isNull: boolean
    [key: string]: any

    constructor(path: string, json: any) {
        this.path = path
        this.isNull = !json

        for (const key in json ?? {}) {
            this[key] = json[key]
        }
    }

    async save() {
        const path = this.path
        delete this.path
        delete this.isNull
        await writeFileSync(path, JSON.stringify(this))
    }
}