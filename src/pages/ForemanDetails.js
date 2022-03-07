import { Link } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useToasts } from "react-toast-notifications";
import { useForm } from "react-hook-form";

const ForemanDetails = () => {
	const [workOrder, setWorkOrder] = useState(null);
	const [loading, setLoading] = useState(false);

	const { orderID } = useParams(); // get id from params

	const { addToast } = useToasts();

	const {
		register,
		handleSubmit,
		reset,
		getValues,
		formState: { errors },
	} = useForm({
		defaultValues: { ...workOrder },
		mode: "onChange",
	});

	const API_URL = `${process.env.REACT_APP_URL}/create/orderdetail/${orderID}`;

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
	const editProgress = async () => {
		try {
			setLoading(true);
			const res = await fetch(
				`${process.env.REACT_APP_URL}/update/progress/${orderID}`,
				{
					method: "PUT",
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
		return editProgress();
	}, []);

	//delete/orderdetail/{detailOrderId}
	const handleDelete = async (id) => {
		try {
			const res = await fetch(
				`${process.env.REACT_APP_URL}/delete/orderdetail/${id}`,
				{
					method: "DELETE",
					headers: {
						"Access-Control-Allow-Origin": "*",
						"Access-Control-Allow-Headers": "*",
					},
				}
			);
			const result = await res.json();
			await getOrderById(orderID);
			return result;
		} catch (error) {
			console.log(error);
		}
	};
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

	const addTask = async (data) => {
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

	const onSubmit = async (data) => {
		try {
			const { task, location } = getValues();
			// call the api
			await addTask("items_to_work=" + task + "&location=" + location);
			handleSuccess("Record added successfully...");
		} catch (error) {
			handleError("Ooops something is wrong!");
		}
	};

	return (
		<Container>
			{workOrder ? (
				<div>
					<div>
						<Heading>{workOrder.operation_description}</Heading>

					</div>
					<Table>
						<Paragraph>
							Start Date <span>{workOrder.start_date}</span>
						</Paragraph>
						<Paragraph>
							End Date <span> {workOrder.end_date}</span>
						</Paragraph>
						<Paragraph>
							Overall Progress % <span> {workOrder.progress_percentage}</span>
						</Paragraph>
					</Table>
					<div>
						<>
							<Subtitle>Tasks to accompolish</Subtitle>
							{workOrder.detailedorder.length > 0 ? (
								workOrder.detailedorder.map((task, i) => (
									<TasksWrapper key={i}>
										<TaskWrapper>
											<Task>
												<Label>task to work</Label>
												<p>{task.item_to_work}</p>
											</Task>

											<Task>
												<Label>Location</Label>
												<p>{task.location}</p>
											</Task>
											<Task>
												<Label>Progress</Label>
												<p>{task.progress}</p>
											</Task>
											<ActionWrapper>
												{/* <button disabled onClick={() => handleDelete(task.id)}>
													Delete
												</button> */}

												<EditLink to={`/manage/foremendetail/${task.id}/edit`}>
													edit
												</EditLink>
											</ActionWrapper>
										</TaskWrapper>
									</TasksWrapper>
								))
							) : (
								<p>No tasks found</p>
							)}
						</>
					</div>
				</div>
			) : (
				<p>No data found</p>
			)}
		</Container>
	);
};

// STYLES

const Container = styled.div`
	width: 60%;
	background: #fff;
	margin: 100px auto;
	padding: 40px 30px;
`;
const Heading = styled.h4`
	font-size: 24px;
	color: #342f4d;
`;
const Paragraph = styled.p`
	display: flex;
	flex-direction: column;
	color: #413d47;
	font-weight: bold;
	text-align: center;

	span {
		color: blue;
	}
`;
const TasksWrapper = styled.div``;

const Subtitle = styled.h5`
	font-size: 18px;
	margin-top: 20px;
	margin-bottom: 10px;
`;
const TaskWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 6px 4px;
	background: #e6e8ffec;
`;
const Task = styled.div`
	display: flex;
	flex-direction: column;
`;
const Label = styled.label`
	font-weight: bold;
	font-size: 14px;
`;
const Table = styled.div`
max-width: 80%;
display: flex;
flex-direction: row;
justify-content: space-between;
margin-top: 20px;
border: 1px solid;
`;
const EditLink = styled(Link)``;
const ActionWrapper = styled.div``;
export default ForemanDetails;
