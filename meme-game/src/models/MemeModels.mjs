import dayjs from "dayjs";

function MemePicture(id, url, description) {
    this.id = id;
    this.url = url;
    this.description = description;
}

function Caption(id, text) {
    this.id = id;
    this.text = text;
}

function MemeAssociation(memeId, captionId, points) {
    this.memeId = memeId;
    this.captionId = captionId;
    this.points = points;
}

export { MemePicture, Caption, MemeAssociation };