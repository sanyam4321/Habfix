import { assignTechnician, getTechnicians } from "../../api/hostelAdminQueries";
import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"



type Issue = {
  issue_id: number
  title: string,
  description: string,
  is_public: boolean,
  is_resolved: boolean,
  issue_media: string,
  location: string,
  created_at: Date,
  category: string,

  technician: {
    technician_id: string,
    password: string,
    name: string,
    email: string,
    category: string,
    phone_number: string,
    Address: string
  }
};

type PopOverProps = {
  issue: Issue;
  togglePopover: any;
};

type ViewIssuesProps = {
  issues: Issue[];
};

type IssueCardProps = {
  name: string;
  index: number;
  handleOnClick: (index: number) => void;
};

const IssueCard = ({ name, index, handleOnClick }: IssueCardProps) => {
  return (
    <div className={`py-2 px-4 relative cursor-pointer  border:none mt-1 text-slate-700 font-semibold rounded bg-gradient-to-r from-[#00FFF5] to-[#00ADB5] text-lg  transition-all shadow-[0_0_1px_#00FFF5] hover:shadow-none text-center max-w-[400px]`} onClick={() => handleOnClick(index)}>
      <h1>{name}</h1>
    </div>
  );

}

const PopOver = ({ issue, togglePopover }: PopOverProps) => {

  const queryClient: QueryClient = useQueryClient();
  const assigntechnician = useMutation({
    mutationFn: assignTechnician,
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ['notAssignedIssues'] });
      togglePopover();
    }
  });
  const technicianQuery = useQuery({
    queryKey: ["listTechnicians"],
    queryFn: getTechnicians,
  });
  if (technicianQuery.isLoading) {
    return (<p>Loading Technicians</p>)
  }
  const technicians = technicianQuery.data.technicians;

  const handleAssign = (technician: any) => {
    console.log(technician);
    console.log(issue);
    const issue_id = issue.issue_id;
    const technician_id = technician.technician_id;
    try {
      toast.promise(assigntechnician.mutateAsync({ issue_id, technician_id }), {
        loading: 'Assigning Technician...',
        success: 'Technician Assigned Successfully',
        error: 'Error Assigning Technician',
      });
    } catch (error: any) {
      toast.error('Error Assigning Technician ' + error.response.data.error);
    }
  }

  return (
    <Popover>
      <PopoverTrigger>
        <button className="bg-[#00FFF5] text-slate-700  px-10 py-1 w-max rounded-md font-bold bg-gradient-to-r from-[#00FFF5] to-[#00ADB5] transition-all shadow-[0_0_1px_#00FFF5] hover:shadow-none">
          Assign
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-max p-2 bg-black">
        <div className="min-w-[380px] p-2 bg-black text-white">
          <h1 className="text-2xl mb-2 text-center">List Of Technicians</h1>
          <div className="flex flex-col gap-2">
            {technicians?.map((technician: any) => {
              return (
                <div key={technician?.technician_id} className="flex justify-between items-center">
                  <h1 className="text-xl font-semibold">{technician?.name}</h1>
                  <h2 className="ml-auto mr-2 bg-black text-white outline px-2 py-1 basis-[30%] rounded-md font-bold transition-all shadow-[0_0_1px_#00FFF5]">{technician?.category}</h2>
                  <button onClick={(e: any) => handleAssign(technician)}
                    className="bg-[#00FFF5] text-slate-700 outline px-1 py-1 basis-[30%] rounded-md font-bold transition-all shadow-[0_0_1px_#00FFF5] hover:shadow-none">
                    Assign
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default function NotAssignedPage({ issues }: ViewIssuesProps) {

  const [notAssigned, setNotAssigned] = useState<any>(issues?.filter(issue => (issue?.technician == null)));
  const [idx, setIdx] = useState(0);

  const [isPopoverOpen, setIsPopoverOpen] = useState(true);

  if (issues == null || issues == undefined) {
    return (<p>No issues found</p>);
  }
  if (notAssigned.length == 0) {
    return (<div className="bg-[#222831] min-h-[94svh] min-w-[73svw] flex flex-col items-center  text-white justify-evenly rounded-lg font-bold text-5xl font-sans">ALL ISSUES ASSIGNED 🎊</div>);
  }
  const togglePopover = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };

  const handleOnClick = (index: number) => {
    setIdx(index);
  }

  return (
    <>
      <div className="customScrollbar flex flex-col text-white font-semibold h-[94svh] overflow-auto basis-[100%] p-2 gap-1">
        {issues?.map((issue, index) => {
          return (
            (issue?.technician == null) && <IssueCard key={index} name={issue?.title} handleOnClick={handleOnClick} index={index} />
          )
        })}
      </div>
      {(issues[idx]?.technician == null) && <div className="bg-[#222831] min-h-[94svh] min-w-[50svw] flex flex-col items-center justify-evenly rounded-lg gap-5">
        <h1 className="profile_name text-white font-bold text-2xl mt-2 min-h-max">{issues[idx]?.category} : {issues[idx]?.title}</h1>
        {issues[idx]?.issue_media && (
          <div className="min-w-[45svw] min-h-[50svh] bg-[#393E46] rounded-lg p-1 flex items-center justify-center">
            {issues[idx]?.issue_media.endsWith(".jpg") || issues[idx]?.issue_media.endsWith(".jpeg") ||
              issues[idx]?.issue_media.endsWith(".png") ? (
              <img src={issues[idx]?.issue_media} alt="Issue Media" className="max-w-[43svw] max-h-[47svh]" />
            ) : (
              <video src={issues[idx]?.issue_media} controls className="max-w-[43svw] max-h-[47svh]" />
            )}
          </div>
        )}
        <h3 className="text-left block text-white font-semibold  basis-[100%] p-2 h-max min-w-[45svw]">Location: {issues[idx]?.location}</h3>
        <p className="text-left block text-white font-semibold overflow-auto customScrollbar min-w-[45svw] p-2 min-h-max max-h-[20svh]">{issues[idx]?.description}</p>
        <div className="flex justify-between w-full items-center gap-4 mt-auto mb-8">
          <button
            onClick={() => setIdx((idx - 1 + issues.length) % issues.length)}
            className="bg-[#00FFF5] text-slate-700 px-2 py-1 mx-5 rounded-md font-bold"
          >
            Prev
          </button>
          {isPopoverOpen ? <PopOver issue={issues[idx]} togglePopover={togglePopover} /> : <p>Issue Assigned</p>}
          <button
            onClick={() => setIdx((idx + 1) % issues.length)}
            className="bg-[#00FFF5] text-slate-700 px-2 py-1 mx-5 rounded-md font-bold"
          >
            Next
          </button>

        </div>
      </div>}
    </>
  );
}