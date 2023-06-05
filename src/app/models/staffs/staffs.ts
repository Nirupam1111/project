import { IAddress } from "../addresses/address";

export interface IStaff {
    id: number,
    email: string,
    phoneNo: number,
    password: string,
    firstName: string,
    lastName: string,
    isActive: boolean,
    address?: IAddress
}