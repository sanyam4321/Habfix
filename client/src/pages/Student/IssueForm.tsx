import React, { useState } from 'react';
import { BsCamera2 } from "react-icons/bs";
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import { createStudentIssue } from '../../api/studentQueries';
import toast from 'react-hot-toast';

const RadioInput = (props: {
    name: string;
    value: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required: boolean;
}) => (
    <label htmlFor={props.value} className='inline-flex items-center m-2'>
        <input type="radio" id={props.value} {...props} className='mr-2' />
        {props.value == 'Miscellaneous' ? 'Misc' : props.value}
    </label>
);
const TextInput = (props: {
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required: boolean;
    placeholder: string;
}) => (
    <input
        type="text"
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        required={props.required}
        placeholder={props.placeholder}
        className='p-2 rounded-lg bg-[#393E46] text-white'
    />
);

const IssueForm = (props: any) => {
    const textInput = ['title', 'description'];
    const location = [ localStorage.getItem('hostel') ,'College']
    const visibility = ['public', 'private'];
    const category = ['carpentry', 'electrician', 'plumber', 'laundry', 'mason', 'sweeper', 'mess_staff', 'internet_service'];
    const [media, setMedia] = useState<any>('');
    type IssueType = { [key: string]: string };
    const queryClient: QueryClient = useQueryClient();
    const createIssue = useMutation<void, Error, FormData>({
        mutationFn: createStudentIssue,
        onSuccess: (data) => {
            console.log(data);
            queryClient.invalidateQueries({ queryKey : ['studentIssues']});
            props.setViewIssues(true);
        },
    });
    const [issue, setIssue] = useState<IssueType>({
        title: '',
        description: '',
        category: '',
        visibility: 'public',
        location: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setIssue({ ...issue, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        console.log(issue);
        e.preventDefault();
        const data = new FormData();
        
        data.append("file", media);
        for(const key in issue){
            if(key == 'visibility'){
                data.append('is_public', issue[key] === 'public'? 'true' : 'false');
            }
            data.append(key, issue[key]);
        }
        try {
            toast.promise(createIssue.mutateAsync(data), {
                loading: 'Creating Issue...',
                success: 'Issue Created Successfully',
                error: 'Error Creating Issue',
            });
        } catch (error: any) {
            console.log(error);
            toast.error('Error Creating Issue '+ error.response.data.error);
        }
    };

    return (
        <>
            <label htmlFor="media" className='bg-[#393E46] min-h-[94svh] min-w-[45svw] flex flex-col items-center justify-center rounded-lg max-sm:min-w-[80svw] max-sm:mt-2 max-sm:min-h-[50svh] '>
                {!media && <BsCamera2 className='bg-[#00FFF5] w-[100px] h-[100px] rounded-full p-5 hover:p-4 cursor-pointer transition-all shadow-[0_0_30px_#00FFF5] hover:shadow-none' />}
                {media && (
                    <div className='m-4 flex flex-col items-center justify-center'>
                        {media.type.includes('image') ? (
                            <img src={URL.createObjectURL(media)} alt="Uploaded Image" className='max-w-[40svw] max-h-[80svh] max-sm:max-w-[80svw] max-sm:max-h-[40svh]' />
                        ) : (
                            <video className='max-w-[40svw] max-h-[80svh] max-sm:max-w-[80svw] max-sm:max-h-[40svh]' controls>
                                <source src={URL.createObjectURL(media)} type={media.type} />
                            </video>
                        )}
                        <button className='bg-[#00FFF5] text-slate-700 px-4 py-2 mt-5 rounded bg-gradient-to-r from-[#00FFF5] to-[#00ADB5] text-lg font-bold transition-all shadow-[0_0_10px_#00FFF5] hover:shadow-none' onClick={() => setMedia(null)}>Change Media</button>
                    </div>
                )}
            </label>
            <form onSubmit={handleSubmit} className='m-5 flex flex-col text-white font-semibold basis-[100%] gap-3'>
                <h1 className='text-center text-4xl font-bold text-[#fff]'>Report Issue</h1>
                <hr className='w-3/4 border-white border-1 self-center mb-5' />
                {textInput.map((input) => (
                    <TextInput
                        key={input}
                        name={input}
                        value={issue[input]}
                        onChange={handleChange}
                        required
                        placeholder={input}
                    />
                ))}
                {
                    // Making Dropdown for Location
                    <select
                        name="location"
                        value={issue.location}
                        onChange={handleChange}
                        required
                        className='p-2 rounded-lg bg-[#393E46] text-white'
                    >
                        <option value="" disabled>
                            Location
                        </option>
                        {(location).map((loc) => (
                            <option value={loc} key={loc}>
                                {loc}
                            </option>
                        ))}
                    </select>
                }
                <input
                    id='media'
                    type="file"
                    name = 'issue_file'
                    onChange={(e) => setMedia(e.target.files![0])}
                    required
                    className='hidden'
                />
                <fieldset className='mt-4 border border-[#fff] rounded-lg'>
                    <legend className='text-2xl px-2 text-center text-[white]'>Category</legend>
                    <div className='grid grid-cols-3 max-w-full m-auto'>
                        {category.map((cat) => (
                            <RadioInput
                                key={cat}
                                name="category"
                                value={cat}
                                checked={issue.category === cat}
                                onChange={handleChange}
                                required
                            />
                        ))}
                    </div>
                </fieldset>
                <div className='mt-4'>
                    <legend className='text-2xl px-2 text-[white]'>Visibility</legend>
                    {visibility.map((vis) => (
                        <RadioInput
                            key={vis}
                            name="visibility"
                            value={vis}
                            checked={issue.visibility === vis}
                            onChange={handleChange}
                            required
                        />
                    ))}
                </div>
                <button type="submit" className='bg-[#00FFF5] text-slate-700 px-4 py-2 mt-4 rounded bg-gradient-to-r from-[#00FFF5] to-[#00ADB5] text-lg font-bold transition-all shadow-[0_0_10px_#00FFF5] hover:shadow-none'>Submit</button>
            </form>
        </>
    );
}
export default IssueForm;