import { useEffect, useState } from "react"


const CollegeAdminProfile = () => {
    const [collegeDetails, setcollegeDetails] = useState<any>({});

    useEffect(() => {
        let values: any = {};
        const keys = ['domain_id', 'college_name', 'phone_number', 'name'];
        keys.forEach((key) => {
            values[key] = localStorage.getItem(key);
        });
        setcollegeDetails(values);
    }, []);

    return (
        <div className="profile flex mt-2 flex-col items-center gap-2 bg-[#393E46] min-w-[20svw] h-max mb-auto  rounded-lg p-4">
            <div className="profile_info flex flex-col items-center gap-4">
                <h1 className="text-3xl text-white text-center font-semibold">{collegeDetails?.college_name}</h1>
                <hr className='border-white border w-[15svw]' />
            </div>
            <div className="profile_details flex flex-col items-start gap-2 basis-[100%] mt-4">
                <p className="text-lg text-white self-start">Email:
                    <span className="text-white font-semibold ml-2">
                        {collegeDetails?.domain_id}
                    </span>
                </p>
                <p className="text-lg text-white">Phone:
                    <span className="text-white font-semibold ml-2">
                        {collegeDetails?.phone_number}
                    </span>
                </p>
            </div>
        </div>
    )
}
export default CollegeAdminProfile