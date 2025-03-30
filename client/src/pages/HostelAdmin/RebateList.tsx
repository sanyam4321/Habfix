import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useQuery } from "@tanstack/react-query";
import { getRebates } from "../../api/hostelAdminQueries";
import { PanelLoader } from "../../Loader/PanelLoader";

export default function RebatePage() {
	const rebateQuery = useQuery({
		queryKey: ["adminRebates"],
		queryFn: getRebates,
	});
	if (rebateQuery.isLoading) {
		return <PanelLoader />;
	}
	const rebateDetails = rebateQuery.data;
	if (rebateDetails.length == 0) {
		return (
			<div className="bg-[#222831] min-h-[94svh] min-w-[73svw] flex flex-col items-center  text-white justify-evenly rounded-lg font-bold text-5xl font-sans">
				NO REBATES
			</div>
		);
	}

	const todayRebates = rebateDetails.filter((rebate: any) => {
		const today = new Date();
		const rebateStartDate = new Date(rebate.from);
		const rebateEndDate = new Date(rebate.to);
		return today >= rebateStartDate && today <= rebateEndDate;
	}).length;

	const tomorrowRebates = rebateDetails.filter((rebate: any) => {
		const tomorrow = new Date();
		tomorrow.setDate(tomorrow.getDate() + 1);
		const rebateStartDate = new Date(rebate.from);
		const rebateEndDate = new Date(rebate.to);
		return tomorrow >= rebateStartDate && tomorrow <= rebateEndDate;
	}).length;

	// todayDateString Should Show date as 15th March 2024
	const todayDateString = new Date().toLocaleDateString("en-IN", {
		day: "numeric",
		month: "long",
		year: "numeric",
	});
	let tomorrow = new Date();
	tomorrow.setDate(tomorrow.getDate() + 1);
	const tomorrowDateString = tomorrow.toLocaleDateString("en-IN", {
		day: "numeric",
		month: "long",
		year: "numeric",
	});

	return (
		<div className="w-[98%] overflow-hidden customScrollbar min-h-[91svh] max-h-[91svh] bg-[#222831] text-white rounded-lg mx-auto my-auto overflow-y-auto overflow-x-hidden">
			<div className="grid grid-cols-2">
				<div>
					<Card className="m-6">
						<CardHeader>
							<CardTitle>Today's Rebated Students</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="flex items-center justify-between">
								<p className="text-lg font-semibold">{todayRebates}</p>
								<div className="text-gray-500">{todayDateString}</div>
							</div>
						</CardContent>
					</Card>
				</div>
				<div className="m-6">
					<Card>
						<CardHeader>
							<CardTitle>Tomorrow's Rebated Students</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="flex items-center justify-between">
								<p className="text-lg font-semibold">{tomorrowRebates}</p>
								<div className="text-gray-500">{tomorrowDateString}</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
			<Card className="mx-6">
				<CardContent className="p-0 grid">
					<div className="sm:overflow-auto">
						<Table className="min-w-[800px] min-h-[65svh]">
							<TableHeader className="">
								<TableRow>
									<TableHead className="font-semibold text-black">
										Student Name
									</TableHead>
									<TableHead className="font-semibold text-black">
										Room Number
									</TableHead>
									<TableHead className="font-semibold text-black">
										Rebate Start Date
									</TableHead>
									<TableHead className="font-semibold text-black">
										Rebate End Date
									</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{rebateDetails.map((rebate: any, index: any) => (
									<TableRow key={index}>
										<TableCell>{rebate.student.name}</TableCell>
										<TableCell>{rebate.student.room_number}</TableCell>
										<TableCell>
											{new Date(rebate.from).toLocaleDateString("en-IN")}
										</TableCell>
										<TableCell>
											{new Date(rebate.to).toLocaleDateString("en-IN")}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				</CardContent>
			</Card>
			<Card className="m-6">
				<CardHeader>
					<CardTitle>Check Rebate Count</CardTitle>
				</CardHeader>
				<CardContent>
					<form className="grid gap-4 md:gap-6">
						<div className="grid gap-2">
							<Label className="text-base" htmlFor="future-date">
								Select Future Date
							</Label>
							<Input id="future-date" type="date" />
						</div>
						<div className="flex justify-end">
							<Button>Check</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
