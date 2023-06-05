import { IAddress } from "../common"

export interface IEventCreate {
    id?: number,
    name: string,
    date: string,
    description: string,
    isActive?: boolean,
    sourceDirectoryPath?: string
}