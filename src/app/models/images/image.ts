import { IEvent } from "../event"
import { IImageType } from "./image-type"

export interface IImage {
    id: number
    name: string
    imageType: IImageType
    size: number
    event?: IEvent
    extension: string
    createdDate?: string
    updatedDate?: string


}