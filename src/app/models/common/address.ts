export interface IAddress {
    id?: number,
    line1: string,
    line2?: string,
    city: string,
    district: string,
    country: string,
    state: string,
    pincode: number,
    createdDate?: string,
    updatedDate?: string
}