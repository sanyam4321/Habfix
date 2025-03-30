import { useState } from "react";
import CollegeAdminProfile from "./CollegeAdminProfile"
import NotAssignedPage from "../CollegeAdmin/NotAssignedPage";
import AssignedPage from "../CollegeAdmin/AssignedPage";
import ReviewPage from "../CollegeAdmin/ReviewPage";
import { useQuery } from "@tanstack/react-query";
import { getCollegeIssues } from "../../api/collegeAdminQueries";

interface ButtonProps {
    name: string;
    handleOnClick: () => void;
}
const Button = ({ name, handleOnClick }: ButtonProps) => {
    let bg
    switch (name) {
        case "Assign Hostel Admin":
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
        <button onClick={handleOnClick} className={`$bg-[#00FFF5] text-slate-900 p-2  my-2 w-[95%] font-bold rounded bg-[#00ADB5] text-lg  transition-all shadow-[0_0_1px_#00FFF5] hover:shadow-none`}>{name}</button>
    )
}
const CollegeAdminDash = () => {
    const [selected, setSelected] = useState({
        'NotAssignedPage': true,
        'AssignedPage': false,
        'ReviewPage': false
    });
    const getStudentIssues = useQuery({
        queryKey: ['collegeIssues'],
        queryFn: getCollegeIssues
    });
    if (getStudentIssues.isLoading) {
        return (
            <div>
                <CollegeAdminProfile />
                <p>Fetching Issues</p>
            </div>
        );
    }
    const issues = getStudentIssues?.data;

    return (
        <div className="container flex items-center gap-4 justify-center min-w-[100svw] min-h-[100svh] bg-slate-600">
            <div className="profile flex flex-col items-center bg-[#222831] min-w-[23svw] min-h-[94svh] rounded-md p-4">
                <CollegeAdminProfile />
                {<Button name="Not Assigned" handleOnClick={() => setSelected({'NotAssignedPage': true, 'AssignedPage': false, 'ReviewPage': false })} />}
                {<Button name="Assigned" handleOnClick={() => setSelected({'NotAssignedPage': false, 'AssignedPage': true, 'ReviewPage': false })} />}
                {<Button name="Review" handleOnClick={() => setSelected({'NotAssignedPage': false, 'AssignedPage': false, 'ReviewPage': true })} />}
            </div>
            <div className="post_issue min-h-[94svh] min-w-[73svw] bg-[#222831] rounded-md flex justify-between items-center">
                {selected.NotAssignedPage && <NotAssignedPage issues={issues} />}
                {selected.AssignedPage && <AssignedPage issues={issues} />}
                {selected.ReviewPage && <ReviewPage issues={issues} />}
            </div>
        </div>
    )
}
export default CollegeAdminDash