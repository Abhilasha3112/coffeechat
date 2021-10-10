import useSWR from 'swr'

export const LOADING_STATE = 'loading'
const fetcher = (url: string): Promise<unknown> =>
  // eslint-disable-next-line unicorn/prevent-abbreviations
  fetch(url).then((res) => res.json())
export const useSessionToken = (baseUrl: string): string => {
  const { data, error } = useSWR(baseUrl, fetcher)

  if (error) {
    return ''
  }
  if (!data) {
    return LOADING_STATE
  }
  const { user } = data as Record<string, Record<string, string>>
  if (user && user.given_name) {
    return user.given_name
  }

  return ''
}
