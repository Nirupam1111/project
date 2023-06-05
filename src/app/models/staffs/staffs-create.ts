import { IAddress } from "../common";

export interface IStaffCreate {
    id?: number,
    firstName: string,
    lastName: string,
    email: string,
    phoneNo: number,
    is_active?: boolean,
    business_id?: number,
    roles_id?: number,
    address_id?: number,
    address?: IAddress
}