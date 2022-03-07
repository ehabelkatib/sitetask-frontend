import { Link } from "react-router-dom";
import styled from "styled-components";

const Welcome = () => {
	return (
		<Wrapper>
			<Paragraph>Welcome back!</Paragraph>

			<StyledLink to="/login/engineer">Engineer</StyledLink>
			<StyledLink to="/login/foreman">Foreman</StyledLink>
		</Wrapper>
	);
};
export default Welcome;

// styles
const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 300px;
	margin: 200px auto;
	background-color: #fff;
	padding: 16px 10px;
	border-radius: 12px;
`;
const Paragraph = styled.p`
	color: #35343b;
	font-size: 18px;
	margin-bottom: 10px;
	text-align: center;
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
