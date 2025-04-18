import { jsx } from '@app/html-jsx'
import { Layout } from './components/Layout'
import { UploadBImageButton } from './components/UploadBImageButton'
import { ImagesTable } from './images'
import { ImageListItem } from './components/ImageListItem'


export const uploadRoute = app.apiCall('/upload', async (ctx, req) => {
    if (!ctx.session) return

    await ImagesTable.create(ctx, {
        filename: req.body.file.name,
        image: req.body.file.hash,
        rating: 1200,
        sessionId: ctx.session.id,
    })
})



app.html('/', async (ctx, req) => {
    const records = await ImagesTable.findAll(ctx, {
        where: { sessionId: ctx.session?.id }
    })

    return (
        <Layout title="Ваши изображение">

            <div class="block">
                <ul class="image-list">
                    {records.length == 0 &&
                        <div>Нет загруженных изображений</div>
                    }
                    {records.map(record =>
                        <ImageListItem record={record} />
                    )}
                </ul>
            </div>

            <UploadBImageButton ctx={ctx} />
        </Layout>
    )
})
