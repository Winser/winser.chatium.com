import { createSignal, createSolidComponent, jsx } from "@app/solid-js";
import { uploadRoute } from "/upload";

export const UploadBImageButton = createSolidComponent((props) => {
    const [loading, setLoading] = createSignal(false)

    const onClick = (input: HTMLInputElement | undefined) => {
        input?.click()
    }

    const onSelectFile = async (input: HTMLInputElement | undefined) => {
        const file = input?.files?.[0];
        if (!file) return;

        //Получение ссылки для загрузки изображения
        const response = await fetch(window.__ugc_internals__?.helpers?.fsGetPutUrl, {
            method: 'POST',
        })
        if (response.status !== 200) return
        const data = await response.json()
        const filePutUrl = data?.data?.filePutUrl

        setLoading(true)
        //Загрузка изображения
        const formData = new FormData()
        formData.append('Filedata', file)
        const response2 = await fetch(filePutUrl, {
            method: 'POST',
            body: formData
        })
        if (response2.status === 200) {
            const fileHash = await response2.text()
            await uploadRoute.run(ctx, { file: { name: file.name, hash: fileHash } })
            setLoading(false)
            window.location.reload()
        }

    }

    let input: HTMLInputElement | undefined;
    return (<>
        <input ref={input} type="file" accept="image/*" style={{ visibility: 'hidden', height: 0 }} onChange={() => onSelectFile(input)} />
        <button class="button" onclick={() => onClick(input)} style={{ width: '100%' }} disabled={loading()}>
            {loading() ? 'Загрузка...' : 'Загрузить изображение'}
        </button>
    </>)
})