import { Outlet } from "react-router-dom"
import AppHeader from "./components/layout/app.header"
import { useEffect } from "react"
import { fetchAccountAPI } from "./services/api"
import { useCurrentApp } from "./components/context/app.context"
import PacmanLoader from "react-spinners/PacmanLoader"

function Layout() {
  const { setUser, setIsAuthenticated, isAppLoading, setIsAppLoading } = useCurrentApp();
  useEffect(() => {
    // Fetch user account information
    const fetchUserAccount = async () => {
      const res = await fetchAccountAPI()
      console.log('User account fetched:', res)
      if (res.data) {
        setUser(res.data.user)
        setIsAuthenticated(true)
      } else {
        setIsAuthenticated(false)
      }
      setIsAppLoading(false);
    }
    fetchUserAccount()
  }, [])

  return (
    <>
      {isAppLoading == false ? (<div>
        <AppHeader />
        <Outlet />
      </div>) : <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
        <PacmanLoader
          size={30}
          color="#36d7b7" />
      </div>}

    </>
  )
}

export default Layout
