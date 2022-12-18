export const sleep = (ms = 250) => new Promise((resolve) => setTimeout(resolve, ms));

export interface RetryOpts {
  retries?: number;
  delay?: number;
  backoff?: number;
}

export const retry = async <T>(
  fn: () => Promise<T>,
  { retries = 3, delay = 1000, backoff = 2 }: RetryOpts = {},
): Promise<T> => {
  try {
    return await fn();
  } catch (e) {
    if (retries === 1) throw e;
    await sleep(delay);
    return retry(fn, { retries: retries - 1, delay: delay * backoff, backoff });
  }
};
