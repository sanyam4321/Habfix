import { useState } from "react";
import HostelAdminProfile from "./HostelAdminProfile"
import RebatePage from "./RebateList";
import NotAssignedPage from "./NotAssignedPage";
import AssignedPage from "./AssignedPage";
import ReviewPage from "./ReviewPage";
import { useQuery } from "@tanstack/react-query";
import { getNotAssignedIssues } from "@/api/hostelAdminQueries";
import DasboardLoader from '../../Loader/DashboardLoader'
import { StudentBills } from "./StudentBills";

interface ButtonProps {
    name: string;
    handleOnClick: () => void;
}
const Button = ({ name, handleOnClick }: ButtonProps) => {
    let bg;
    switch (name) {
        case "Analytics":
            bg = "bg-blue-500"
            break;
        case "Not Assigned":
            bg = "bg-red-500"
            break;
        case "Assigned":
            bg = "bg-green-500"
            break;
        case "Review":
            bg = "bg-yellow-500"
            break;
        default:
            bg = "bg-blue-500"
            break;
    }
    return (
        <button onClick={handleOnClick} className={` text-slate-900 p-2  my-2 w-[95%] font-bold rounded bg-[#00ADB5] text-lg  transition-all shadow-[0_0_2px_#00FFF5] hover:shadow-none`}>{name}</button>
    )
}
const HostelAdminDash = () => {
    const [selected, setSelected] = useState({
        'StudentBills': false,
        'RebatePage': true,
        'NotAssignedPage': false,
        'AssignedPage': false,
        'ReviewPage': false
    })
    const notAssignedIssueQuery = useQuery({
        queryKey: ['notAssignedIssues'],
        queryFn: getNotAssignedIssues, 
    });
    
    // causing page issue
    if(notAssignedIssueQuery.isLoading){
        return (<DasboardLoader />)
    }
    const issues = notAssignedIssueQuery.data.issues;
    
    return (
        <div className="container flex items-center gap-4 justify-center min-w-[100svw] min-h-[100svh] bg-slate-600">
            <div className="profile flex flex-col items-center bg-[#222831] min-w-[23svw] min-h-[94svh] rounded-md p-4">
                    <HostelAdminProfile />
                    {<Button name="Student Bills" handleOnClick={() => setSelected({ 'StudentBills': true, 'RebatePage': false, 'NotAssignedPage': false, 'AssignedPage': false, 'ReviewPage': false })} />}
                    {<Button name="Rebate List" handleOnClick={() => setSelected({'StudentBills': false, 'RebatePage': true, 'NotAssignedPage': false, 'AssignedPage': false, 'ReviewPage': false })} />}
                    {<Button name="Not Assigned" handleOnClick={() => setSelected({'StudentBills': false, 'RebatePage': false, 'NotAssignedPage': true, 'AssignedPage': false, 'ReviewPage': false })} />}
                    {<Button name="Assigned" handleOnClick={() => setSelected({'StudentBills': false, 'RebatePage': false, 'NotAssignedPage': false, 'AssignedPage': true, 'ReviewPage': false })} />}
                    {<Button name="Review" handleOnClick={() => setSelected({'StudentBills': false, 'RebatePage': false, 'NotAssignedPage': false, 'AssignedPage': false, 'ReviewPage': true })} />}
            </div>
            <div className="post_issue min-h-[94svh] min-w-[73svw] bg-[#222831] rounded-md flex justify-between items-center">
                {selected.StudentBills && <StudentBills />}
                {selected.RebatePage && <RebatePage />}
                {selected.NotAssignedPage && <NotAssignedPage issues={issues} />}
                {selected.AssignedPage && <AssignedPage issues={issues} />}
                {selected.ReviewPage && <ReviewPage issues={issues}/>}
            </div>
        </div>
    )
}
export default HostelAdminDash