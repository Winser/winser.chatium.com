import { jsx } from '@app/html-jsx'
import { Layout } from './components/Layout'
import { ImagesTable } from './images'
import { ImageListItem } from './components/ImageListItem'

app.html('/', async (ctx, req) => {
    const records = await ImagesTable.findAll(ctx, {
        order: { rating: 'desc' },
        limit: 10
    })

    return (
        <Layout title="Рейтинг лучших изображений">
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
        </Layout>
    )
})
