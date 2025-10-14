import { EditNotePage } from "../pages/private/EditNotePage";
import { NewNotePage } from "../pages/private/NewNotePage";
import { ViewNotePage } from "../pages/private/ViewNotePage";
import { NotesLayout } from "../layouts/NotesLayout";
import { LoginPage } from "../pages/public/LoginPage";
import { RegisterPage } from "../pages/public/RegisterPage";
import { Navigate, Route, Routes } from "react-router";
import { AuthLayout } from "../layouts/AuthLayout";
import { HomeNotesPages } from "../pages/private/HomeNotesPages";
import { useRenewToken } from '../hooks/useAuth'
import { Loading } from '../components/ui/Loading'
import { useEffect } from "react";
import { useAuthStore } from "../stores/useAuthStore";
import { saveAuthData } from "../helpers/saveAuthData";

export const AppRoutes = () => {

  const { data, error, isPending } = useRenewToken()
  const status = useAuthStore((state) => state.status)
  const setLogin = useAuthStore((state) => state.setLogin)
  const setLogout = useAuthStore((state) => state.setLogout)


  useEffect(() => {
    if(data){
      const user = { name: data.name, uid: data.uid  }
      saveAuthData({ user, token: data.token}, setLogin)
    }else if(error){
      setLogout()
    }
  }, [data, error,  setLogin, setLogout])

  if(isPending || status === 'checking') return <Loading />

  return (
    <Routes>
       {
        status === 'authenticated'
        ?
        (<Route element={ <NotesLayout /> }>
          <Route path="/" element={ <HomeNotesPages /> }/>
          <Route path="/notes/new" element={ <NewNotePage /> }/>
          <Route path="/notes/view/:id" element={ <ViewNotePage /> }/>
          <Route path="/notes/edit/:id" element={ <EditNotePage /> }/>
          <Route path="/*" element={ <Navigate to="/" /> }/>
        </Route>)
        :
        (<Route element={ <AuthLayout /> } >
          <Route path="/login" element={ <LoginPage /> }/>
          <Route path="/register" element={ <RegisterPage /> }/>
          <Route path="/*" element={ <Navigate to="/login" replace /> }/>
        </Route>)
      }
    </Routes>
  );
};