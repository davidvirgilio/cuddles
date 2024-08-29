export default async function urlToImage(url: string, userId: string | undefined, mimeType: string, prefix: string = ''): Promise<File> {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    const filename = `${prefix}${prefix ? '-' : ''}${userId}-${Date.now()}.${mimeType.split('/')[1]}`
    return new File([buffer], filename, { type: mimeType });
}