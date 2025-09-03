import { Header } from "../Header/Header"
import { Outlet } from "react-router-dom"
import { Footer } from "../Footer/Footer"

export function Layout() {
  return (
   <>
    <Header></Header>
        <main>
         <Outlet></Outlet>
        </main>
    <Footer></Footer>
   </>
  )
}
