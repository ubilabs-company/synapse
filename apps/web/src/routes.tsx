import { Route, Routes } from 'react-router'
import { AuthLayout } from './layouts/auth'
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
      </Route>

      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  )
}
