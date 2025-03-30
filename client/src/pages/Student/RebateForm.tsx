import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { useState } from "react";
import { DialogClose } from "@radix-ui/react-dialog";
import { useMutation } from "@tanstack/react-query";
import { submitRebate } from "../../api/studentQueries";

interface ButtonProps {
	name: string;
	handleOnClick: () => void;
}

const MyButton = ({ name, handleOnClick }: ButtonProps) => {
	return (
		<button
			onClick={handleOnClick}
			className="bg-[#00FFF5] text-slate-700 font-semibold rounded p-2 text-lg  transition-all shadow-[0_0_10px_#00FFF5] hover:shadow-none"
		>
			{name}
		</button>
	);
};

export const RebateForm = () => {
	const [rebate, setRebate] = useState({
		from: Date.now(),
		to: Date.now(),
		reason: "",
	});

	function handleOnChange(e: any) {
		setRebate({ ...rebate, [e.target.id]: e.target.value });
	}

	const createRebate = useMutation({
		mutationFn: submitRebate,
		onSuccess: (data) => {
			console.log(data.messRebate);
		},
	});

	function handleSubmit() {
		try {
			const data: any = rebate;
			toast.promise(createRebate.mutateAsync(data), {
				loading: "Submitting...",
				success: "Rebate submitted!",
				error: "Error submitting rebate",
			});
		} catch (error: any) {
			toast.error(error.response.data.error);
		}
	}
	return (
		<Dialog>
			<DialogTrigger>
				<MyButton name="Rebate Form" handleOnClick={() => {}} />
			</DialogTrigger>
			<DialogContent className="bg-black text-white">
				<DialogHeader>
					<DialogTitle className="sm:text-4xl text-3xl mb-4">
						Request a Mess Rebate
					</DialogTitle>
					<DialogDescription>
						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label htmlFor="from" className="text-xl">
									From
								</Label>
								<Input
									className="w-full"
									id="from"
									placeholder="Enter your email"
									type="date"
									onChange={handleOnChange}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="to" className="text-xl">
									To
								</Label>
								<Input
									className="w-full"
									id="to"
									placeholder="Enter your email"
									type="date"
									onChange={handleOnChange}
								/>
							</div>
						</div>
						<div className="space-y-2 my-3">
							<Label htmlFor="reason" className="text-xl">
								Reason
							</Label>
							<Textarea
								className="min-h-[100px]"
								id="reason"
								placeholder="Enter your message"
								onChange={handleOnChange}
							/>
						</div>
						<div className="flex justify-end mt-2">
							<DialogClose>
								<Button
									size="sm"
									className="outline hover:bg-white hover:text-black"
									onClick={handleSubmit}
								>
									Submit
								</Button>
							</DialogClose>
						</div>
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};
