export function makeCancellablePromise(promise: Promise<any>): Promise<any> {
    let cancelFn: any = null

    const cancellablePromise: any = new Promise((resolve, reject) => {
        cancelFn = () => reject(new Error('Operation canceled.'));
        promise.then(resolve).catch(reject);
    });

    cancellablePromise.cancel = cancelFn;
    return cancellablePromise;
}
