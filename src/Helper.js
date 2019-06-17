export const Helper = {
    arrayBufferToBase64: ({ data }) => {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(data));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return btoa(binary);
    }
}