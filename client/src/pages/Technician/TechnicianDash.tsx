import { useEffect, useState } from 'react'
import TechnicianProfile from './TechnicianProfile'
import ViewIssues from './ViewIssues'
import { useQuery } from '@tanstack/react-query'
import { getAssignedIssues } from '@/api/technicianQueries'
import DashboardLoader from '@/Loader/DashboardLoader'

const TechnicianDash = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        category: ''
    });
    
    useEffect(() => {
        let values: any = {};
        const keys = ['category', 'email', 'name', 'phone_number', 'Address'];
        keys.forEach((key) => {
            values[key] = localStorage.getItem(key);
        });
        setUser(values);
    }, []);

    const getTechnicianIssues = useQuery({
        queryKey: ['technicianIssues'],
        queryFn: getAssignedIssues
    });

    if(getTechnicianIssues.isLoading){
        return (<DashboardLoader />)
    }
    const issues = getTechnicianIssues.data;
    return (
        <div className="container flex items-center gap-4 justify-center min-w-[100svw] min-h-[100svh] bg-slate-700">
            <div className="profile flex flex-col items-center gap-[8rem] bg-[#222831] min-w-[23svw] min-h-[94svh] rounded-md pt-2">
                <TechnicianProfile user={user} bgc='#393E46'/>
                <button className="btn bg-[#00FFF5] cursor-pointer text-slate-700 font-bold py-2 px-4 mt-auto mb-5 rounded-md transition-all shadow-[0_0_10px_#00FFF5] hover:shadow-none">On Leave</button>
            </div>
            <div className="post_issue min-h-[94svh] min-w-[73svw] bg-[#222831] rounded-md flex justify-between items-center">
                <ViewIssues issues={issues} />
            </div>
        </div>
    )
}
export default TechnicianDash