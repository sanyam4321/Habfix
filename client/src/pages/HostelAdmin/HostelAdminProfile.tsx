import { useEffect, useState } from "react"


const HostelAdminProfile = () => {
    const [hostelDetails, setHostelDetails] = useState({
        hostel: '',
        domain_id: '',
        name: '',
        phone_number: '',
        roll_number: ''
    });

    useEffect(() => {
        let values: any = {};
        const keys = ['hostel', 'domain_id', 'name', 'phone_number'];
        keys.forEach((key) => {
            values[key] = localStorage.getItem(key);
        });
        let rollNumber = 1234;
        values.roll_number = rollNumber
        setHostelDetails(values);
    }, []);

    return (
        <div className="profile flex flex-col items-center gap-2 bg-[#393E46]  min-w-[20svw] h-max mb-auto mt-2 rounded-lg p-4">
            {/* <div className="profile_pic w-[150px] h-[150px] rounded-full bg-slate-700 flex items-center justify-center">
                <img src={hostelDetails?.profilePhoto} className='rounded-full' />
            </div> */}
            <div className="profile_info flex flex-col items-center gap-4">
                <h1 className="text-3xl text-white text-center font-semibold">{hostelDetails.name}</h1>
                <hr className='border-white border w-[15svw]' />
                <p className="text-lg text-white font-bold">Hostel No  <span className='text-2xl bg-[#00FFF5] text-slate-700 ml-2 px-1 rounded-md py-0'>{hostelDetails.hostel}</span></p>
            </div>
            <div className="profile_details flex flex-col items-start gap-2 basis-[100%] mt-4">
                <p className="text-lg text-white self-start">Email:
                    <span className="text-white font-semibold ml-2">
                        {hostelDetails.domain_id}
                    </span>
                </p>
                <p className="text-lg text-white">Phone:
                    <span className="text-white font-semibold ml-2">
                        {hostelDetails.phone_number}
                    </span>
                </p>
            </div>
        </div>
    )
}
export default HostelAdminProfile