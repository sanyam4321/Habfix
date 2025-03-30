import { useEffect, useState } from 'react'

export default function StudentProfile() {
    const [user, setUser] = useState({});

    useEffect(() => {
        let values: any = {};
        const keys = ['domain_id', 'name', 'hostel', 'phone_number', 'profile_picture', 'password', 'room_number'];
        keys.forEach((key) => {
            values[key] = localStorage.getItem(key);
        });
        let rollNumber = 1234;
        values.roll_number = rollNumber
        setUser(values);
    }, []);


    return (
        <div className="profile flex flex-col justify-center gap-2 items-center bg-[#393E46] sm:w-[20svw] mx-auto rounded-lg shadow-slate-700 shadow-sm p-2 grow">
            <div className="profile_pic w-[100px] h-[100px] bg-slate-200 rounded-full">
                <img src={(user as any).profile_picture} className='rounded-full max-w-[100px] max-h-[100px]' />
            </div>
            <div className="profile_name text-white font-bold text-2xl mt-2 text-center">{(user as any).name}</div>
            <br />
            <div className="profile_email text-white text-lg font-semibold my-1">{(user as any).domain_id}</div>
            <div className="profile_email text-white text-2xl font-bold mb-2 flex items-center gap-3">{(user as any).hostel} <span className='text-2xl bg-[#00FFF5] text-slate-700 px-1 rounded-md py-0'>{(user as any).room_number}</span></div>
        </div>
    )
}