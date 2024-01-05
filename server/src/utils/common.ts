import { File } from "buffer";

export function checkFileType(file: File) {
    if (file?.name) {
        const fileType = file.name.split(".").pop();
        if (
            fileType === "webp" ||
            fileType === "jpg" ||
            fileType === "jpeg" ||
            fileType === "png"
        )
            return true;
    }
    return false;
}
