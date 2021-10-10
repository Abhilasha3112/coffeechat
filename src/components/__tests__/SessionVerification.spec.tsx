import useSWR from 'swr'
import { LOADING_STATE, useSessionToken } from '../SessionVerification'

jest.mock('swr')
describe('SessionVerification', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  describe('receives all the data', () => {
    const response = { jwt: 'abcd', user: { given_name: 'pqrs' } }
    beforeEach(() => {
      ;(useSWR as jest.Mock).mockReturnValue({
        data: response,
      })
    })
    afterEach(() => {
      jest.clearAllMocks()
    })
    it('returns username', () => {
      const result = useSessionToken('/test')
      expect(result).toEqual('pqrs')
    })
  })
  describe('data still loading', () => {
    beforeEach(() => {
      ;(useSWR as jest.Mock).mockReturnValue({
        data: null,
        error: null,
      })
    })
    afterEach(() => {
      jest.resetAllMocks()
    })
    it('returns loading state', () => {
      const result = useSessionToken('/test')
      expect(result).toEqual(LOADING_STATE)
    })
  })
  describe('receives error', () => {
    beforeEach(() => {
      ;(useSWR as jest.Mock).mockReturnValue({
        data: null,
        error: 'error',
      })
    })
    afterEach(() => {
      jest.resetAllMocks()
    })
    it('returns empty string', () => {
      const result = useSessionToken('/test')
      expect(result).toEqual('')
    })
  })
})
