import { jsx } from "@app/html-jsx"
import { Layout } from "./components/Layout"
import { ImagesTable } from "./images"
import { ImageVoteButton } from "./components/ImageVoteButton"

export const voteRoute = app.apiCall('/vote', async (ctx, req) => {
  const { winId, lostId } = req.body
  const winImage = await ImagesTable.findById(ctx, winId)
  const lostImage = await ImagesTable.findById(ctx, lostId)
  if (!winImage || !lostImage) return

  const k = 25
  const winRating = winImage.rating
  const lostRating = lostImage.rating
  const expectedWin = 1 / (1 + 10 ** ((lostRating - winRating) / 400))
  const expectedLost = 1 - expectedWin

  winImage.rating = winRating + k * (1 - expectedWin)
  lostImage.rating = lostRating + k * (0 - expectedLost)

  ImagesTable.update(ctx, winImage)
  ImagesTable.update(ctx, lostImage)
})

app.html('/', async (ctx, req) => {
  const allImages = await ImagesTable.findAll(ctx)

  let r1 = Math.floor(Math.random() * allImages.length)
  let r2 = Math.floor(Math.random() * allImages.length)
  if (r1 == r2) {
    if (r2 == allImages.length - 1) { r2-- } else { r2++ }
  }
  const image1 = allImages[r1]
  const image2 = allImages[r2]

  if (!image1 || !image2) {
    return (
      <Layout title="Сравнение картинок">
        <div class="compare-image-text">
          Нет картинок
        </div>
      </Layout>
    )
  }

  return (
    <Layout title="Сравнение картинок">
      <ImageVoteButton ctx={ctx} imageUrl={image1.image.getThumbnailUrl(600)} winId={image1.id} lostId={image2.id}/>

      <div class="compare-image-text">
        Выберите изображение
      </div>

      <ImageVoteButton ctx={ctx} imageUrl={image2.image.getThumbnailUrl(600)} winId={image2.id} lostId={image1.id} />
    </Layout>
  )
})