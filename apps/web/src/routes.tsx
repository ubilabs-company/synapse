import { Route, Routes } from 'react-router'
import { AuthLayout } from './layouts/auth'
import { NotFound } from './pages/404'
import { Chat } from './pages/chat'
import { ForgotPassword } from './pages/forgot-password'
import { SignIn } from './pages/sign-in'
import { SignUp } from './pages/sign-up'

export function Router() {
  return (
    <Routes>
      {/* <Route element={<AppLayout />} errorElement={<ErrorBoundary />}>
        <Route index element={<Chat />} />
      </Route> */}

      <Route element={<AuthLayout />}>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
