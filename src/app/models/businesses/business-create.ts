import { IAddress } from "../common";

export interface IBusinessCreate {
    id?: number,
    name: string,
    ownerFirstName: string,
    ownerLastName: string,
    address: IAddress,
    password:string
    email: string,
    phoneNo: number,
    registrationNumber?: string,
    isActive?: boolean,
}