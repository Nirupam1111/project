import { IAddress } from "../common"

export interface IClientCreate {
    id?: number,
    firstName?: string,
    lastName?: string,
    name?: string,
    phoneNo: number,
    email?: string,
    address?: IAddress,
    password?: string,
    isActive?: boolean
}