import { NextPage } from 'next'
import React, { useEffect } from 'react'
import Router from 'next/router'
import {
  LOADING_STATE,
  useSessionToken,
} from '../components/SessionVerification'

const Home: NextPage = () => {
  const username = useSessionToken('/jwt')
  useEffect(() => {
    if (!username) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      Router.push('/')
    }
  }, [username])

  return (
    <>
      {username && username !== LOADING_STATE && (
        <h1>Welcome to the homepage, {username}</h1>
      )}
    </>
  )
}
export default Home
