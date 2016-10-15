export function createError() {
  return {message: 'something wrong'};
}

export function promiseStub(status, res) {
  return () => {
    return new Promise((resolve, reject) => {
      if (status === 'success') {
        resolve(res);
      } else if (status === 'error') {
        reject(res);
      } else {
        reject(res);
      }
    });
  };
}
