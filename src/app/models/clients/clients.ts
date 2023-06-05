import { IAddress } from "../addresses/address";
import { IBusiness } from "../businesses";
import { IEvent } from "../event";

export interface IClient {
    id: number,
    firstName: string,
    lastName: string,
    name: string,
    email: string,
    phoneNo: number,
    password: string,
    isActive: boolean,
    address?: IAddress,
    createdDate?: string,
    updatedDate?: string
    business?: IBusiness,
    events?: IEvent[],
}