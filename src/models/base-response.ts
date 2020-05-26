export class BaseResponse<T> {
    data: T
    status: Status

    constructor(data: T, status: Status) {
        this.data = data;
        this.status = status;
    }
}

export enum Status {
    OK = 'OK',
    NO_SUCH_CONTACT = 'NO_SUCH_CONTACT',
    EMPTY_NAME = 'EMPTY_NAME'
}
