export default async function urlToImage(url: string, userId: string | undefined, mimeType: string, isAvatar: boolean = false): Promise<File> {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();

    const filename = `${
        isAvatar ? `avatar-${userId}` : `${userId}-${Date.now()}`
    }.${
        mimeType.split('/')[1]
    }`;

    return new File([buffer], filename, { type: mimeType });
}