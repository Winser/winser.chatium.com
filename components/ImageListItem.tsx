import { jsx } from "@app/html-jsx"
import {  ImagesTableRecord } from "../images"

type Props = {
    record: ImagesTableRecord
}
export const ImageListItem = ({record}: Props) => {
    return (<li>
        <img src={record.image.getThumbnailUrl(80)} alt="" />
        <div class="image-info">
            <p>{record.filename}</p>
            <p>{record.createdAt.toLocaleDateString()}</p>
        </div>
        <div class="image-rating">
            {Math.round(record.rating)}
            <img src="/assets/icons/star.svg" alt="" width='10px' height='10px' />
        </div>
    </li>)
}