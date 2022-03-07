import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Task from "../components/Task";
import { Oval } from "react-loader-spinner";

const Tasks = () => {
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		return fetchAllPosts();
	}, []);

	const API_URL = `${process.env.REACT_APP_URL}/workorder`;
	const fetchAllPosts = async () => {
		try {
			setLoading(true);
			const res = await fetch(API_URL);
			const result = await res.json();
			// setState -> add data from the api to out state
			setOrders(result);
			setLoading(false);
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};

	return (
		<Wrapper>
			<Container>
				<Heading>Manage all work orders</Heading>
				<StyledLink to="/manage/work-order/new">Add Task</StyledLink>
			</Container>
			<div>
				{loading ? (
					<Loader>
						<Oval height="50" width="50" />
					</Loader>
				) : (
					<>
						{orders.length > 0 ? (
							orders.map((order, i) => (
								<Task key={i} order={order} fetchAllPosts={fetchAllPosts} />
							))
						) : (
							<p>No result found</p>
						)}
					</>
				)}
			</div>
		</Wrapper>
	);
};

export default Tasks;

// STYLES
const Wrapper = styled.div`
	width: 60%;
	margin: 80px auto;
`;
const Container = styled.div`
	display: flex;
	justify-content: space-between;
	justify-items: center;
	align-items: center;
`;
const Heading = styled.h2`
	margin: 20px 0;
`;

const StyledLink = styled(Link)`
	padding: 12px 12px;
	background: #a783e0;
	border-radius: 3px;
	text-decoration: none;
	color: #fff;
	font-size: 12px;
	margin: 10px;
	text-align: center;
	display: inline-block;
	font-weight: bolder;
`;
const Loader = styled.div`
	display: flex;
	justify-content: center;
	align-content: center;
`;
