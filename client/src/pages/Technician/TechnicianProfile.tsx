import sampleDP from '../../assets/profile.png';
// import { useState } from 'react'

type TechnicianProfileProps = {
    user: {
        technician_id: string,
        password: string,
        name: string,
        email: string,
        category: string,
        phone_number: string,
        Address: string
    },
    bgc?: string
}

export default function TechnicianProfile({ user, bgc }: TechnicianProfileProps) {    
    return (
        <div className={`profile flex flex-col items-center gap-2 bg-${`[${bgc}]` || '[#393E46]'} min-w-[20svw] h-max mb-auto  rounded-md p-4`}>
            <div className="profile_pic w-[150px] h-[150px] rounded-full bg-slate-700 flex items-center justify-center">
                <img src={sampleDP} className='rounded-full' />
            </div>
            <div className="profile_info flex flex-col items-center gap-4">
                <h1 className="text-3xl text-white">{user.name}</h1>
                <hr className='border-white border w-[15svw]' />
                <p className="text-lg text-white font-bold">Category  <span className='text-2xl bg-gradient-to-r from-[#00FFF5] to-[#00ADB5] text-slate-700 ml-2 px-1 rounded-md py-0'>{user.category}</span></p>
            </div>
            <div className="profile_details flex flex-col items-start gap-4 basis-[100%] mt-4">
                <p className="text-lg text-[#fff] self-start">Email:
                    <span className="text-white font-semibold ml-2">
                        {user.email}
                    </span>
                </p>
                <p className="text-lg text-[#fff]">Phone:
                    <span className="text-[#fff] font-semibold ml-2">
                        {user.phone_number}
                    </span>
                </p>
                <p className="text-lg text-[#fff]">Address:
                    <span className="text-white ml-2">
                        {user.Address}
                    </span>
                </p>
            </div>
        </div>
    )
}
