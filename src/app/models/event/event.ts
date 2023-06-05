import { IClient } from "../clients"
import { IImage } from "../images"
import { IStaff } from "../staffs"

export interface IEvent {
    id: number,
    name: string,
    description: string,
    date: string,
    images?: IImage[],
    isActive?: boolean,
    sourceDirectoryPath?: string,
    client?: IClient,
    staff?: IStaff,
    createdDate?: string,
    updatedDate?: string
}