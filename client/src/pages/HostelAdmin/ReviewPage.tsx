import { reviewIssues } from "../../api/hostelAdminQueries";
import {
	QueryClient,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type ReviewPageProps = {
	issues: Issue[];
};
type Issue = {
	issue_id: number;
	title: string;
	description: string;
	is_public: boolean;
	is_resolved: boolean;
	issue_media: string;
	location: string;
	created_at: Date;
	category: string;

	technician: {
		technician_id: string;
		password: string;
		name: string;
		email: string;
		category: string;
		phone_number: string;
		Address: string;
	};
};

type IssueCardProps = {
	name: string;
	index: number;
	handleOnClick: (index: number) => void;
};

const IssueCard = ({ name, index, handleOnClick }: IssueCardProps) => {
	return (
		<div
			className={`border:none mt-1 text-slate-700 font-semibold rounded bg-gradient-to-r from-[#00FFF5] to-[#00ADB5] text-lg  transition-all shadow-[0_0_1px_#00FFF5] hover:shadow-none text-center py-2 px-4 cursor-pointer`}
			onClick={() => handleOnClick(index)}
		>
			<h1 className="font-bold">{name}</h1>
		</div>
	);
};

export default function ReviewPage({ issues }: ReviewPageProps) {
	const [notReviewed, setNotReviewed] = useState(
		issues.filter((issue) => issue.is_resolved)
	);
	const [idx, setIdx] = useState(0);
	const queryClient: QueryClient = useQueryClient();
	const reviewStudentIssue = useMutation({
		mutationFn: reviewIssues,
		onSuccess: (data) => {
			console.log(data);
			queryClient.invalidateQueries({ queryKey: ["notAssignedIssues"] });
            setIdx(0);
		},
	});
	if (issues == null || issues == undefined) {
		return (
			<div className="bg-slate-200 min-h-[94svh] min-w-[73svw] flex flex-col items-center justify-evenly rounded-lg font-bold text-5xl font-sans">
				ALL ISSUES REVIEWED 🎊
			</div>
		);
	}
	if (notReviewed.length == 0) {
		return (
			<div className="bg-slate-200 min-h-[94svh] min-w-[73svw] flex flex-col items-center justify-evenly rounded-lg font-bold text-5xl font-sans">
				ALL ISSUES REVIEWED 🎊
			</div>
		);
	}
	const handleOnClick = (index: number) => {
		setIdx(index);
	};
	const handleReview = (index: number) => {
		try {
			const issue_id = issues[index]?.issue_id;
            toast.promise(reviewStudentIssue.mutateAsync(issue_id), {
                loading: "Reviewing Issue...",
                success: "Issue Reviewed Successfully",
                error: "Error Reviewing Issue",
            });
			
		} catch (error: any) {
			toast.error(error.response.data.error);
		}
	};
	return (
		<>
			<div className="flex flex-col text-white font-semibold h-[94svh] overflow-auto basis-[100%] p-2 gap-1">
				{issues.map((issue, index) => {
					return (
						issue.is_resolved &&
						issue.technician != null && (
							<IssueCard
								key={index}
								name={issue.title}
								handleOnClick={handleOnClick}
								index={index}
							/>
						)
					);
				})}
			</div>
			{issues[idx]?.is_resolved && issues[idx]?.technician != null && (
				<div className="bg-[#393E46] p-[5%] min-h-[94svh] min-w-[40svw] flex flex-col justify-evenly rounded-lg">
					<h1 className="profile_name text-white font-bold text-2xl text-center mt-2 min-h-max">
						{issues[idx]?.category} : {issues[idx]?.title}
					</h1>
					{issues[idx].issue_media && (
						<div className="min-w-[30svw] min-h-[50svh] bg-[#222831] m-auto rounded-lg p-1 flex items-center justify-center">
							{issues[idx]?.issue_media.endsWith(".jpg") ||
							issues[idx]?.issue_media.endsWith(".jpeg") ||
							issues[idx]?.issue_media.endsWith(".png") ||
							issues[idx]?.issue_media.endsWith(".gif") ? (
								<img
									src={issues[idx]?.issue_media}
									alt="Issue Media"
									className="max-w-[30svw] max-h-[50svh]"
								/>
							) : (
								<video
									src={issues[idx]?.issue_media}
									controls
									className="w-full h-full object-cover"
								/>
							)}
						</div>
					)}
					<p className="text-white">{issues[idx]?.description}</p>
					<button
						onClick={() => handleReview(idx)}
						className="text-slate-700 font-semibold mt-auto rounded bg-[#00FFF5] px-4 py-1 basis-[30%]"
					>
						Review
					</button>
				</div>
			)}
		</>
	);
}
