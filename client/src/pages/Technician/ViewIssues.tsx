import { resolveIssue } from "../../api/technicianQueries";
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

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


type ViewIssuesProps = {
  issues: Issue[];
};

type IssueCardProps = {
  name: string;
  status: string;
  index: number;
  handleOnClick: (index: number) => void;
  issueID: number;
};

const IssueCard = ({ name, status, index, handleOnClick, issueID }: IssueCardProps) => {
  const queryClient: QueryClient = useQueryClient();
  
  const resolveTechnicianIssue = useMutation({
    mutationFn: resolveIssue,
    onSuccess: ()=>{
      queryClient.invalidateQueries({queryKey : ['technicianIssues']});
    }
  });

  const handleIssueStatus = ()=>{
    resolveTechnicianIssue.mutate(issueID);
  }
  return (
    // change the css here
    <div className={`py-2 text-slate-700 px-4 relative cursor-pointer flex items-center justify-between ${status == 'pending' ? `bg-gradient-to-r from-[#00FFF5] to-[#00ADB5]` : `bg-[#00ADB5]`} rounded-md transition-all shadow-[0_0_1px_#00FFF5] hover:shadow-none text-center mt-2`} onClick={() => handleOnClick(index)}>
      <h1 className="font-bold">{name}</h1>
      <input type="checkbox" name="status" id="" value={name} checked={status == 'resolved' ? true : false} onChange={handleIssueStatus}/>
    </div>
  );

}

export default function ViewIssues({ issues }: ViewIssuesProps) {
  const [idx, setIdx] = useState(0);
  if(issues == null || issues == undefined || issues?.length == 0){
    return (<p>No issues found</p>);
  }
  const handleOnClick = (index: number) => {
    setIdx(index);
  }
  return (
    <>
      <div className="flex flex-col text-white font-semibold h-[94svh] overflow-auto basis-[100%] p-2 gap-1">
        {issues.map((issue, index) => (
          <IssueCard key={index} name={issue?.title} status={issue?.is_resolved ? 'resolved' : 'pending'} handleOnClick={handleOnClick} index={index} issueID = {issue?.issue_id}/>
        ))}
      </div>
      <div className="bg-[#222831] min-h-[94svh] min-w-[50svw] flex flex-col items-center justify-evenly rounded-lg gap-5">
        <h1 className="profile_name text-white font-bold text-2xl mt-2 min-h-max">{issues[idx]?.title}</h1>
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
        <h3 className="text-left block text-white font-semibold overflow-auto customScrollbar min-w-[45svw] p-2 h-max shrink">Location: {issues[idx]?.location}</h3>
        <p className="text-left block text-white font-semibold overflow-auto customScrollbar min-w-[45svw] p-2 min-h-max max-h-[20svh] grow">{issues[idx]?.description}</p>
        <div className="flex justify-center w-full items-center gap-4 mt-auto mb-8">
          <button
            onClick={() => setIdx((idx - 1 + issues.length) % issues.length)}
            className="btn bg-[#00FFF5] text-slate-700 px-2 py-1 rounded-md font-bold"
          >
            Prev
          </button>
          <button
            onClick={() => setIdx((idx + 1) % issues.length)}
            className="btn bg-[#00FFF5] text-slate-700 px-2 py-1 rounded-md font-bold"
          >
            Next
          </button>

        </div>
      </div>
    </>
  );
}