import { IAddress } from '../addresses/address';

export interface IBusiness {
    id: number,
    registrationNumber: string,
    name: string,
    email: string,
    phoneNo: number,
    password: string,
    ownerFirstName: string,
    ownerLastName: string,
    isActive: boolean,
    address?: IAddress
}