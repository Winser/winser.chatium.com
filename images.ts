import { Heap } from '@app/heap'

export const ImagesTable = Heap.Table('images', {
    filename: Heap.String(),
    image: Heap.ImageFile(),
    rating: Heap.Number(),
    sessionId: Heap.String(),
})

export type ImagesTableRecord = typeof ImagesTable.T