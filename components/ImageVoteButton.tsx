import { createSignal, createSolidComponent, jsx } from "@app/solid-js";
import { voteRoute } from "../index";

type Props = {
    imageUrl: string
    winId: string
    lostId: string
}

export const ImageVoteButton = createSolidComponent(({ imageUrl, winId, lostId }: Props) => {
    const onClick = async () => {
        await voteRoute.run(ctx, { winId, lostId })
        window.location.reload()
    }

    return (
        <button class="block image" onClick={onClick}>
            <img src={imageUrl} height={300} />
        </button>)
})