import {Navbar,Footer} from "./navbar"
import { useConvexAuth } from "convex/react";
import {Spinner} from "@/components/ui/spinner"
const MarketingLayout = ({
    childern
}:{
    childern:React.ReactNode;
}) => {
    const { isLoading} = useConvexAuth()
    return(
        <>
            {!isLoading && (<div className="h-full">
                <Navbar />
                <main className="h-full pt-40">
                    {childern}
                </main>
            </div>)}
       {isLoading && (<div className="flex dark:text-white justify-center h-full items-center"><Spinner className="dark:text-white" /></div>)}
        </>
    );
}

export default MarketingLayout