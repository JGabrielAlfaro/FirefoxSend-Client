import '@/styles/globals.css'
import AuthState from '@/context/auth/authState'


export default function App({ Component, pageProps }) {
  return (
      <AuthState>
        <Component {...pageProps} />
      </AuthState>
    )
}
