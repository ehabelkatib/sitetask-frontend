import { useToasts } from "react-toast-notifications";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";

const ForemanEditDetails = () => {
	const [detail, setDetail] = useState(null);
	const { detailId } = useParams();

	// /detailed/{workOrderHeaderId}
	const fetchDetail = async () => {
		try {
			const res = await fetch(
				`${process.env.REACT_APP_URL}/detailedorder/${detailId}`,
				{
					method: "GET",
					headers: {
						"Access-Control-Allow-Origin": "*",
						"Access-Control-Allow-Headers": "*",
					},
				}
			);
			const result = await res.json();
			setDetail(result);
		} catch (error) {
			console.log(error);
		}
	};

	const { addToast } = useToasts();

	// handles toast error alert msgs
	const handleError = (error) => {
		addToast(error, {
			appearance: "error",
			autoDismiss: true,
		});
	};

	// handles toast success alert msgs
	const handleSuccess = (result) => {
		addToast(result, {
			appearance: "success",
			autoDismiss: true,
		});
	};

	useEffect(() => {
		return fetchDetail();
	}, []);

	const {
		register,
		handleSubmit,
		reset,
		getValues,
		formState: { errors },
	} = useForm({
		defaultValues: { ...detail },
		mode: "onChange",
	});

	useEffect(() => {
		if (detail) {
			reset({
				task: detail.item_to_work,
				location: detail.location,
				progress: detail.progress,
			});
		}
	}, [detail, reset]);

	const editDetail = async (data) => {
		const res = await fetch(
			`${process.env.REACT_APP_URL}/update/orderdetail/${detailId}`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			}
		);
		return res.json();
	};

	const onSubmit = async () => {
		try {
			const { task, location, progress } = getValues();

			await editDetail({
				item_to_work: task,
				location: location,
				progress: progress,
			});
			handleSuccess("Record updated successfully...");
		} catch (error) {
			handleError("Ooops something is wrong!");
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<input type="text" {...register("task")} placeholder="Add task" disabled />
			<input type="text" {...register("location")} placeholder="location" disabled/>
			<input type="number" {...register("progress")} placeholder="progress" max={100} />
			<button type="submit">Edit Task</button>
			{/* <Link to={`/manage/work-order/${detailId}/details`}>Back</Link> */}
		</form>
	);
};
export default ForemanEditDetails;
