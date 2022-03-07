import styled from "styled-components";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useToasts } from "react-toast-notifications";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

// FORM VALIDATION
const AddEditSchema = yup.object().shape({
	description: yup
		.string()
		.trim("Field can not be empty")
		.required("Description is required"),
	startDate: yup.date().required("Start date is required"),
	endDate: yup.date().required("End date is required"),
});

const AddEditWorkOrder = () => {
	const [workOrder, setWorkOrder] = useState(null);
	const [loading, setLoading] = useState(false);

	const { orderID } = useParams();

	const isAddMode = !orderID;

	const {
		register,
		handleSubmit,
		reset,
		setValue,
		getValues,
		formState: { errors },
	} = useForm({
		defaultValues: { ...workOrder },
		mode: "onChange",
		resolver: yupResolver(AddEditSchema),
	});

	useEffect(() => {
		if (workOrder) {
			reset({
				description: workOrder.operation_description,
				startDate: workOrder.start_date,
				endDate: workOrder.end_date,
				tasks: workOrder.items_to_work,
				location: workOrder.location,
			});
		}
	}, [workOrder, reset]);

	// method to make a post request to the api/create/workorder
	const API_URL = `${process.env.REACT_APP_URL}/create/workorder`;
	const API_URL_EDIT = `${process.env.REACT_APP_URL}/update/workorder/${orderID}`;

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

	const createOrder = async (data) => {
		const res = await fetch(API_URL, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: data,
		});
		return res.json();
	};

	const editOrder = async (data) => {
		const res = await fetch(API_URL_EDIT, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
		return res.json();
	};

	const onSubmit = () => {
		return isAddMode ? saveOrder() : updateOrder();
	};

	// create order
	const saveOrder = async () => {
		try {
			const { description, startDate, endDate, tasks, location } = getValues();

			await createOrder(
				"operation_description=" +
					description +
					"&start_date=" +
					startDate +
					"&end_date=" +
					endDate +
					"&items_to_work=" +
					tasks +
					"&location=" +
					location
			);
			handleSuccess("Record added successfully...");
		} catch (error) {
			handleError("Ooops something is wrong!");
		}
	};

	const getOrderById = async () => {
		try {
			setLoading(true);
			const res = await fetch(
				`${process.env.REACT_APP_URL}/workorder/${orderID}`,
				{
					method: "GET",
					headers: {
						"Access-Control-Allow-Origin": "*",
						"Access-Control-Allow-Headers": "*",
					},
				}
			);
			const result = await res.json();
			setWorkOrder(result);
			setLoading(false);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		return getOrderById();
	}, []);

	// update order
	const updateOrder = async () => {
		try {
			const { description, startDate, endDate, tasks, location } = getValues();

			await editOrder({
				operation_description: description,
				start_date: startDate,
				end_date: endDate,
				items_to_work: tasks,
				location: location,
			});
			handleSuccess("Record updated successfully...");
		} catch (error) {
			handleError("Ooops something is wrong!");
		}
	};
	return (
		<Wrapper>
			<StyledForm onSubmit={handleSubmit(onSubmit)}>
				{isAddMode ? (
					<Heading>Create a new work order</Heading>
				) : (
					<Heading>Edit work order</Heading>
				)}
				<FormGroup>
					<FormLabel htmlFor="">Description</FormLabel>
					<StyledInput
						{...register("description")}
						type="text"
						placeholder="Describe your work order"
					/>
					{errors.description && (
						<SmallText>{errors.description.message}</SmallText>
					)}
				</FormGroup>
				<FormGroup>
					<FormLabel htmlFor="">Start Date</FormLabel>
					<StyledInput {...register("startDate")} type="date" />
					{errors.startDate && (
						<SmallText>{errors.startDate.message}</SmallText>
					)}
				</FormGroup>
				<FormGroup>
					<FormLabel htmlFor="">End Date</FormLabel>
					<StyledInput {...register("endDate")} type="date" />
					{errors.startDate && <SmallText>{errors.endDate.message}</SmallText>}
				</FormGroup>

				<ButtonWrapper>
					<StyledLink to="/manage/work-orders">Back</StyledLink>
					{isAddMode ? (
						<AddButton type="submit">Add Task</AddButton>
					) : (
						<AddButton type="submit">Edit Task</AddButton>
					)}
				</ButtonWrapper>
			</StyledForm>
		</Wrapper>
	);
};
// STYLES
const Wrapper = styled.div`
	width: 60%;
	margin: 80px auto;
	background-color: #fff;
	padding: 20px 10px;
	border-radius: 10px;
`;
const Heading = styled.h4`
	margin-bottom: 10px;
	font-size: 18px;
`;
const SmallText = styled.p`
	margin-top: 1px;
	margin-bottom: 2px;
	color: #ffa9a9;
	font-size: 9px;
`;
const StyledForm = styled.form`
	padding: 20px 10px;
`;
const FormGroup = styled.div`
	display: flex;
	flex-direction: column;
`;
const StyledInput = styled.input`
	width: 100%;
	padding: 12px;
	border-radius: 5px;
	border: 1px solid #d1d1d1;
	margin-top: 5px;
	margin-bottom: 10px;

	&:focus {
		outline: none;
		box-shadow: 0px 0px 2px red;
	}
`;
const FormLabel = styled.label`
	color: #616161;
	font-size: 13px;
	font-weight: bold;
`;
const ButtonWrapper = styled.div`
	display: flex;
	align-content: center;
	align-items: center;
`;
const AddButton = styled.button`
	padding: 12px;
	border-radius: 5px;
	background: #a783e0;
	color: #fff;
	font-weight: bold;
	margin-top: 5px;
	border: none;
	cursor: pointer;
	margin-left: 20px;

	&:hover {
		background: #9572ce;
	}
`;

const StyledLink = styled(Link)`
	padding: 12px;
	border-radius: 5px;
	background: #98969b;
	color: #fff;
	font-weight: bold;
	margin-top: 5px;
	border: none;
	cursor: pointer;
`;

export default AddEditWorkOrder;
