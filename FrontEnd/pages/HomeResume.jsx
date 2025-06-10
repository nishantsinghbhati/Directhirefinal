import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StepContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  padding: theme.spacing(2),
}));

const StepIconCircle = styled(Box)(({ theme }) => ({
  width: 32,
  height: 32,
  borderRadius: '50%',
  backgroundColor: theme.palette.primary.main, // Using primary color for the circle
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 'bold',
  marginBottom: theme.spacing(1),
}));

const IllustrationPlaceholder = styled(Box)(({ theme }) => ({
  width: 80,
  height: 80,
  backgroundColor: '#f0f0f0', // Placeholder background
  borderRadius: 8,
  marginBottom: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px dashed #1976d2', // Dashed border to indicate placeholder
}));

const DottedLine = styled(Box)(({ theme }) => ({
  width: 60, // Adjusted width for segments
  height: 1, // Keep height small
  background: 'radial-gradient(circle, #1976d2 1px, transparent 1px) repeat-x bottom', // Repeating dots
  backgroundSize: '8px 100%', // Size of each dot and spacing
  margin: theme.spacing(0, 2),
  alignSelf: 'center', // Keep this to center it vertically within the flex container row
}));

const VerticalDottedLine = styled(Box)(({ theme }) => ({
  width: 1, // Make it thin
  height: theme.spacing(2), // Adjust height as needed
  borderRight: '2px dotted #1976d2', // Vertical dotted border
  margin: theme.spacing(1, 0), // Add vertical margin
}));

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Create a Job-Winning CV | Professional Resume Builder</title>
        <meta name="description" content="Create a job-winning CV in minutes with our easy-to-use online resume builder. Choose a template, add your details, and download." />
      </Helmet>

      {/* Wrapper Box for vertical centering */}
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        py: 4, // Add some vertical padding to avoid content sticking to edges on smaller screens
      }}>
        <Container maxWidth="md" sx={{ mt: 0, mb: 0, textAlign: 'center' }}> {/* Adjusted margins */}
          <Typography variant="h3" component="h1" gutterBottom>
            Create a <span style={{ color: '#1976d2' }}>job-winning</span> CV in minutes
          </Typography>
          <Typography variant="subtitle1" paragraph color="text.secondary">
            Choose your design, add your information, and download instantly.
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 6, mb: 6 }}>
            {/* Step 1 */}
            <StepContainer>
              <StepIconCircle>1</StepIconCircle>
              <VerticalDottedLine />
              <IllustrationPlaceholder><svg xmlns="http://www.w3.org/2000/svg" width="121" height="120" viewBox="0 0 121 120" fill="none">
<path fillRule="evenodd" clipRule="evenodd" d="M73.5135 52.4521C67.1511 45.5654 56.4651 45.0808 49.6508 51.3241C42.8401 57.564 42.4365 68.1982 48.7958 75.0815C51.2613 77.7503 54.3754 79.4572 57.6639 80.1844C58.4728 80.3633 58.9835 81.164 58.8047 81.9729C58.6258 82.7818 57.8251 83.2925 57.0162 83.1137C53.1486 82.2584 49.4858 80.2494 46.5922 77.1173C39.1254 69.0351 39.5666 56.4944 47.6241 49.1121C55.678 41.7333 68.2533 42.3376 75.717 50.4164C78.9141 53.8769 80.6623 58.1564 80.9821 62.4968C81.043 63.323 80.4226 64.0421 79.5964 64.103C78.7702 64.1639 78.0511 63.5435 77.9902 62.7173C77.7188 59.0337 76.2366 55.3997 73.5135 52.4521Z" fill="black"/>
<path fillRule="evenodd" clipRule="evenodd" d="M68.0115 57.6962C64.5928 53.9957 58.7954 53.7575 55.0653 57.175C51.3389 60.5891 51.0956 66.3516 54.511 70.0484C55.376 70.9847 56.3901 71.6974 57.4831 72.1863C58.2393 72.5246 58.5781 73.4118 58.2398 74.1681C57.9015 74.9243 57.0143 75.2631 56.2581 74.9248C54.8023 74.2736 53.4533 73.3245 52.3075 72.0842C47.7598 67.1618 48.0921 59.4951 53.0387 54.963C57.9818 50.4341 65.6707 50.7416 70.2151 55.6604C71.5336 57.0876 72.4443 58.75 72.9491 60.5014C73.1785 61.2975 72.7192 62.1288 71.9232 62.3582C71.1272 62.5876 70.2959 62.1283 70.0665 61.3323C69.6883 60.0203 69.0063 58.7729 68.0115 57.6962Z" fill="black"/>
<path d="M74.6978 112.982L86.4338 94.3295L106.623 86.6985L64.1016 67.4177L74.6978 112.982Z" fill="#E5AAE5"/>
<path fillRule="evenodd" clipRule="evenodd" d="M63.1427 66.2571C63.5843 65.895 64.1932 65.8151 64.7133 66.0509L107.234 85.3316C107.786 85.582 108.134 86.1401 108.114 86.746C108.095 87.3519 107.712 87.8865 107.145 88.1008L87.4275 95.5539L75.9596 113.78C75.6372 114.293 75.0384 114.561 74.4414 114.461C73.8443 114.36 73.3662 113.911 73.229 113.321L67.9309 90.5391C67.7433 89.7322 68.2453 88.9259 69.0522 88.7383C69.8591 88.5506 70.6653 89.0526 70.8529 89.8595L75.3362 109.138L85.1565 93.53C85.3305 93.2534 85.59 93.0412 85.8957 92.9257L102.705 86.5719L66.2435 70.0388L68.2039 78.4684C68.3915 79.2753 67.8895 80.0815 67.0826 80.2692C66.2757 80.4568 65.4695 79.9548 65.2818 79.1479L62.6328 67.7568C62.5034 67.2006 62.7011 66.6192 63.1427 66.2571Z" fill="black"/>
<path fillRule="evenodd" clipRule="evenodd" d="M57.75 104C57.75 103.172 58.4216 102.5 59.25 102.5H59.2501C60.0785 102.5 60.7501 103.172 60.7501 104C60.7501 104.829 60.0785 105.5 59.2501 105.5H59.25C58.4216 105.5 57.75 104.829 57.75 104Z" fill="black"/>
<path fillRule="evenodd" clipRule="evenodd" d="M24.5 9V102.562H53.9404C54.7688 102.562 55.4404 103.234 55.4404 104.062C55.4404 104.891 54.7688 105.562 53.9404 105.562H23.3119C22.3112 105.562 21.5 104.751 21.5 103.751V7.81194C21.5 6.81122 22.3112 6 23.3119 6H69.9986C70.3983 6 70.7933 6.13239 71.116 6.38475L95.0544 25.1097C95.4935 25.4531 95.75 25.9795 95.75 26.5369V62.7241C95.75 63.5525 95.0784 64.2241 94.25 64.2241C93.4216 64.2241 92.75 63.5525 92.75 62.7241V27.1159L69.5901 9H24.5Z" fill="black"/>
<path fillRule="evenodd" clipRule="evenodd" d="M68.625 27.9658V9.3877H71.625V26.7758H95.5001V29.7758H70.435C69.4354 29.7758 68.625 28.9654 68.625 27.9658Z" fill="black"/>
</svg></IllustrationPlaceholder>
              <Typography variant="body2">
                Choose your professionally designed template
              </Typography>
            </StepContainer>

            <DottedLine />

            {/* Step 2 */}
            <StepContainer>
              <StepIconCircle>2</StepIconCircle>
              <VerticalDottedLine />
              <IllustrationPlaceholder><svg xmlns="http://www.w3.org/2000/svg" width="121" height="120" viewBox="0 0 121 120" fill="none">
<path fillRule="evenodd" clipRule="evenodd" d="M67 80C67 80.8284 66.3284 81.5 65.5 81.5H25.5C24.6716 81.5 24 80.8284 24 80C24 79.1716 24.6716 78.5 25.5 78.5H65.5C66.3284 78.5 67 79.1716 67 80Z" fill="black"/>
<path fillRule="evenodd" clipRule="evenodd" d="M43.25 23.5C43.25 22.1193 44.3693 21 45.75 21H104.456C105.837 21 106.956 22.1193 106.956 23.5V29.0376C106.956 29.866 106.284 30.5376 105.456 30.5376C104.628 30.5376 103.956 29.866 103.956 29.0376V24H46.25V49.0181H63.4109C64.2394 49.0181 64.9109 49.6897 64.9109 50.5181C64.9109 51.3466 64.2394 52.0181 63.4109 52.0181H45.75C44.3693 52.0181 43.25 50.8989 43.25 49.5181V23.5Z" fill="black"/>
<path fillRule="evenodd" clipRule="evenodd" d="M67.125 50.25C67.125 49.4216 67.7966 48.75 68.625 48.75H68.6251C69.4535 48.75 70.1251 49.4216 70.1251 50.25C70.1251 51.0784 69.4535 51.75 68.6251 51.75H68.625C67.7966 51.75 67.125 51.0784 67.125 50.25Z" fill="black"/>
<path fillRule="evenodd" clipRule="evenodd" d="M14.5 63.2258H59.6969C60.5253 63.2258 61.1969 62.5543 61.1969 61.7258C61.1969 60.8974 60.5253 60.2258 59.6969 60.2258H14C12.6193 60.2258 11.5 61.3451 11.5 62.7258V94.3476C11.5 95.7283 12.6193 96.8476 14 96.8476H105.394C106.775 96.8476 107.894 95.7283 107.894 94.3476V73.6802C107.894 72.8518 107.222 72.1802 106.394 72.1802C105.565 72.1802 104.894 72.8518 104.894 73.6802V93.8476H14.5V63.2258Z" fill="black"/>
<path fillRule="evenodd" clipRule="evenodd" d="M110.497 46.5129C111.396 47.1838 111.567 48.4627 110.877 49.3468L88.1814 78.4074C87.8198 78.8704 87.2729 79.151 86.6859 79.1747L77.292 79.5544C76.3583 79.5921 75.523 78.9783 75.28 78.0761L72.8908 69.2035C72.7273 68.5965 72.8587 67.948 73.2456 67.4526L96.0857 38.1994C96.755 37.3422 97.9867 37.1769 98.8583 37.8274L110.497 46.5129Z" fill="#FFDD66"/>
<path fillRule="evenodd" clipRule="evenodd" d="M77.1944 77.9507L87.9237 77.9328L110.872 48.3923L97.0663 38.1884L92.1694 44.5302C91.6631 45.1859 90.7211 45.307 90.0654 44.8007C89.4097 44.2944 89.2885 43.3524 89.7949 42.6967L94.991 35.9673C95.8223 34.8907 97.3618 34.6763 98.4557 35.4848L113.067 46.2841C114.196 47.1187 114.417 48.7194 113.555 49.8283L90.143 79.9661C89.6703 80.5746 88.9434 80.9312 88.1729 80.9324L76.8341 80.9513C75.7463 80.9531 74.7822 80.2513 74.4497 79.2155L71.0359 68.583C70.7836 67.7971 70.9354 66.9373 71.4417 66.2854L83.3551 50.9455C83.8632 50.2913 84.8055 50.1728 85.4598 50.6809C86.1141 51.1891 86.2326 52.1314 85.7244 52.7857L73.9729 67.9171L77.1944 77.9507Z" fill="black"/>
<path fillRule="evenodd" clipRule="evenodd" d="M11.5 23.5C11.5 22.1193 12.6193 21 14 21H36.2824C37.6631 21 38.7824 22.1193 38.7824 23.5V49.5181C38.7824 50.8988 37.6631 52.0181 36.2824 52.0181H14C12.6193 52.0181 11.5 50.8988 11.5 49.5181V23.5ZM14.5 24V49.0181H35.7824V24H14.5Z" fill="black"/>
</svg></IllustrationPlaceholder>
              <Typography variant="body2">
                Add pre-written examples to each section
              </Typography>
            </StepContainer>

            <DottedLine />

            {/* Step 3 */}
            <StepContainer>
              <StepIconCircle>3</StepIconCircle>
              <VerticalDottedLine />
              <IllustrationPlaceholder><svg xmlns="http://www.w3.org/2000/svg" width="121" height="120" viewBox="0 0 121 120" fill="none">
<path fillRule="evenodd" clipRule="evenodd" d="M29.3594 110C29.3594 109.172 30.0309 108.5 30.8594 108.5L82.9308 108.5L82.9308 102.857C82.9308 102.029 83.6024 101.357 84.4308 101.357C85.2592 101.357 85.9308 102.029 85.9308 102.857L85.9308 109.792C85.9308 110.735 85.166 111.5 84.2225 111.5L30.8594 111.5C30.0309 111.5 29.3594 110.829 29.3594 110Z" fill="black"/>
<path fillRule="evenodd" clipRule="evenodd" d="M11.5 20.9227C11.5 19.9793 12.2648 19.2144 13.2083 19.2144H20.1429C20.9713 19.2144 21.6429 19.8859 21.6429 20.7144C21.6429 21.5428 20.9713 22.2144 20.1429 22.2144H14.5V104.911C14.5 105.739 13.8284 106.411 13 106.411C12.1716 106.411 11.5 105.739 11.5 104.911V20.9227Z" fill="black"/>
<path fillRule="evenodd" clipRule="evenodd" d="M23.5938 11.5V99.4091H94.1232V55.4545H95.6232H97.1232V100.597C97.1232 101.598 96.3119 102.409 95.3112 102.409H22.4057C21.405 102.409 20.5938 101.598 20.5938 100.597V10.3119C20.5938 9.31124 21.405 8.5 22.4057 8.5H58.8585C58.8584 8.5 58.8585 8.5 58.8585 8.5H95.3112C96.2854 8.5 97.1232 9.28076 97.1232 10.3078L97.1232 55.4545C97.1232 55.4548 97.1232 55.4545 95.6232 55.4545C94.1232 55.4545 94.1232 55.4548 94.1232 55.4545L94.1232 11.5H58.859C58.8589 11.5 58.859 11.5 58.859 11.5H23.5938Z" fill="black"/>
<path fillRule="evenodd" clipRule="evenodd" d="M11.6094 109.688C11.6094 108.859 12.2809 108.188 13.1094 108.188H13.1095C13.9379 108.188 14.6095 108.859 14.6095 109.688C14.6095 110.516 13.9379 111.188 13.1095 111.188H13.1094C12.2809 111.188 11.6094 110.516 11.6094 109.688Z" fill="black"/>
<path d="M104.378 41.25C104.378 54.9266 104.378 66.271 104.378 66.271L114.539 66.271L95.8153 91.25L77.1048 66.271L87.0938 66.271L87.0938 41.25" fill="#FFA07A"/>
<path fillRule="evenodd" clipRule="evenodd" d="M95.815 92.75C95.3427 92.7499 94.8979 92.5273 94.6147 92.1493L75.9043 67.1703C75.5637 66.7157 75.5092 66.1077 75.7634 65.5998C76.0175 65.0918 76.5368 64.771 77.1048 64.771L85.5938 64.771L85.5938 41.25C85.5938 40.4216 86.2653 39.75 87.0938 39.75L104.378 39.75C105.206 39.75 105.878 40.4216 105.878 41.25L105.878 47.5C105.878 48.3284 105.206 49 104.378 49C103.549 49 102.878 48.3284 102.878 47.5L102.878 42.75L88.5938 42.75L88.5938 66.271C88.5938 67.0994 87.9222 67.771 87.0938 67.771L80.1025 67.771L95.8157 88.7485L111.54 67.771L104.378 67.771C103.549 67.771 102.878 67.0994 102.878 66.271L102.878 57.6534C102.878 56.825 103.549 56.1534 104.378 56.1534C105.206 56.1534 105.878 56.825 105.878 57.6534L105.878 64.771L114.539 64.771C115.107 64.771 115.626 65.0919 115.881 65.6C116.135 66.1081 116.08 66.7161 115.739 67.1707L97.0155 92.1497C96.7322 92.5276 96.2874 92.7501 95.815 92.75Z" fill="black"/>
<path fillRule="evenodd" clipRule="evenodd" d="M33.1094 31.25C33.1094 30.4216 33.7809 29.75 34.6094 29.75H79.6094C80.4378 29.75 81.1094 30.4216 81.1094 31.25C81.1094 32.0784 80.4378 32.75 79.6094 32.75H34.6094C33.7809 32.75 33.1094 32.0784 33.1094 31.25Z" fill="black"/>
<path fillRule="evenodd" clipRule="evenodd" d="M33.1094 41.25C33.1094 40.4216 33.7809 39.75 34.6094 39.75H64.6094C65.4378 39.75 66.1094 40.4216 66.1094 41.25C66.1094 42.0784 65.4378 42.75 64.6094 42.75H34.6094C33.7809 42.75 33.1094 42.0784 33.1094 41.25Z" fill="black"/>
</svg></IllustrationPlaceholder>
              <Typography variant="body2">
                Download and start applying
              </Typography>
            </StepContainer>
          </Box>

          <Button
            variant="contained"
            size="large"
            sx={{
              mt: 4,
              bgcolor: '#00ff99', // Bright green color
              color: 'black',
              '&:hover': {
                bgcolor: '#00e68a', // Darker green on hover
              },
              borderRadius: 25, // Pill shape
              padding: '12px 30px',
              fontSize: '1.1rem',
            }}
            onClick={() => navigate('templates')}
          >
            Let's go
          </Button>
        </Container>
      </Box>
    </>
  );
}

export default Home; 