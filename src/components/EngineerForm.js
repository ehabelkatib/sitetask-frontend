import { Link } from "react-router-dom/cjs/react-router-dom.min";
import styled from "styled-components";

const EngineerForm = () => {
	return (
		<Wrapper>
			<form>
				<SubTItle>Login as Engineer</SubTItle>
				<Paragraph>Enter your credentials to continue...</Paragraph>
				<FormGroup>
					<StyledLabel htmlFor="email">Email</StyledLabel>
					<StyledInput type="email" placeholder="Enter email" />
				</FormGroup>
				<FormGroup>
					<StyledLabel htmlFor="password">Password</StyledLabel>
					<StyledInput type="password" placeholder="Enter password" />
				</FormGroup>
				<StyledButton to="/manage/work-orders">Login</StyledButton>
			</form>
		</Wrapper>
	);
};
export default EngineerForm;

// styles
const Wrapper = styled.div`
	background-color: #fff;
	display: flex;
	flex-direction: column;
	align-content: center;
	width: 25%;
	margin: 200px auto;
	border-radius: 10px;
	padding: 20px;
`;

const FormGroup = styled.div`
	margin-bottom: 10px;
`;
const SubTItle = styled.h4`
	color: #35343b;
	font-size: 17px;
	margin: 0px 0px 20px;
	text-align: center;
`;
const Paragraph = styled.p`
	color: #35343b;
	font-size: 13px;
	margin-bottom: 10px;
	text-align: center;
`;
const StyledLabel = styled.label`
	color: #616161;
	font-size: 13px;
	font-weight: bold;
`;
const StyledInput = styled.input`
	width: 100%;
	padding: 12px;
	border-radius: 5px;
	border: 1px solid #d1d1d1;
	margin-top: 5px;

	&:focus {
		outline: none;
		box-shadow: 0px 0px 2px red;
	}
`;
export const StyledButton = styled(Link)`
	width: 100%;
	padding: 12px;
	border-radius: 5px;
	background: #a783e0;
	color: #fff;
	font-weight: bold;
	margin-top: 5px;
	border: none;
	cursor: pointer;
	display: block;
	text-align: center;

	&:hover {
		background: #9572ce;
	}
`;
