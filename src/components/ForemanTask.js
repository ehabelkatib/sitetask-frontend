import { Link } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useToasts } from "react-toast-notifications";

const ForemanTask = ({ order, fetchAllPosts }) => {
	const [orderId, setOrderId] = useState(null);
	const { orderID } = useParams();

	useEffect(() => {
		if (orderID) setOrderId(orderID);
	}, [orderID]);

	const { addToast } = useToasts();

	const handleSuccess = (result) => {
		addToast(result, {
			appearance: "success",
			autoDismiss: true,
		});
	};

	const handleDelete = async (id) => {
		try {
			const res = await fetch(
				`${process.env.REACT_APP_URL}/delete/workorder/${id}`,
				{
					method: "DELETE",
					headers: {
						"Access-Control-Allow-Origin": "*",
						"Access-Control-Allow-Headers": "*",
					},
				}
			);
			const result = await res.json();
			handleSuccess("Record removed successfully...");
			await fetchAllPosts();
			return result;
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<Wrapper>
			<ListWrapper>
				<List>
					<StyledLink to={`/manage/tasks/${order.id}/details`}>
						{order.operation_description}
					</StyledLink>
					<ButtonWrapper>
						<DetailsButton to={`/view/work-order/${order.id}/details`}>
							View
						</DetailsButton>
					</ButtonWrapper>
				</List>
			</ListWrapper>
		</Wrapper>
	);
};
export default ForemanTask;

const Wrapper = styled.div``;
const ListWrapper = styled.ul`
	list-style: none;
`;
const List = styled.li`
	padding: 12px;
	background: #fff;
	margin-bottom: 10px;
	border-radius: 5px;
	border-left: 5px solid;
	border-left-color: #3b97c2;
	cursor: pointer;
	display: flex;
	justify-content: space-between;
	&:hover {
		background: #e3e2ff;
	}
`;
const StyledLink = styled(Link)`
	text-decoration: none;
	color: #4f4e55;
`;

const DeleteButton = styled.button`
	visibility: hidden;
	font-size: 10px;
	background: #ffacac;
	border: none;
	border-radius: 3px;
	padding: 3px;
	color: #fff6f6;
	font-weight: bold;
	cursor: pointer;
`;

const EditButton = styled(Link)`
	font-size: 10px;
	background: #758eff;
	border: none;
	border-radius: 3px;
	padding: 3px;
	color: #fff6f6;
	font-weight: bold;
	cursor: pointer;
	margin-left: 5px;
`;
const DetailsButton = styled(EditButton)`
	background: #dbe1ff;
	color: #474747;
`;

const ButtonWrapper = styled.div`
	display: flex;
	& button {
		margin-left: 10px;
	}
`;
