const createResponse = (data: any, status: number, message: string) => {
    return {
        status: status,
        message: message,
        data: data
    }
}

export default createResponse;