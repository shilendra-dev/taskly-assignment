export default function handleApiError(err: any, defaultMessage: string) {
    const error = new Error(err?.response?.data?.message || err?.message || defaultMessage);
    (error as any).status = err?.response?.data?.status || err?.status;
    throw error;
}