import api from "./axios"

export async function uploadAvatar(file: Blob) {
    const formData = new FormData()
    formData.append('file', file)
    const { data } = await api.post('upload/avatar', formData, {
        headers: { 'Content-Type': undefined }
    })
    return data
}

export async function uploadBanner(file: Blob) {
    const formData = new FormData()
    formData.append('file', file)
    const { data } = await api.post('upload/banner', formData, {
        headers: { 'Content-Type': undefined }
    })
    return data
}

export async function getCroppedImage(
    imageSrc: string,
    cropPixels: { x: number, y: number, width: number, height: number },
    outputWidth: number,
    outputHeight: number
): Promise<Blob> {
    const image = new Image()
    image.src = imageSrc
    await new Promise((resolve) => image.onload = resolve)
    const canvas = document.createElement('canvas')
    canvas.width = outputWidth
    canvas.height = outputHeight
    const ctx = canvas.getContext('2d')
    ctx!.drawImage(
        image,
        cropPixels.x, cropPixels.y, cropPixels.width, cropPixels.height, 0, 0, outputWidth, outputHeight
    )
    return new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
            if (blob) resolve(blob)
            else reject(new Error('Canvas toBlob failed'))
        }, 'image/jpeg', 0.9)
    })
}