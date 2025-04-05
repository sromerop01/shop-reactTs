import { ReactNode } from "react"

const Layout = ({ children } : { children: ReactNode }) => {
    return(
        <div className='flex flex-col items-center mt-17'>
            {children}
        </div>
    )
}

export default Layout