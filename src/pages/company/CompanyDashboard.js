import { Typography, Box, Stack } from '@mui/material';
import StatComponent from '../../component/StatComponent';
import { useSelector } from 'react-redux';
import { Chart } from "react-google-charts";
import { data, options } from './data/companyData'; // Replace with your company data
import ChartComponent from '../../component/ChartComponent';
import WorkIcon from '@mui/icons-material/Work';

const CompanyDashboard = () => {
  const { company } = useSelector(state => state.companyProfile); // Adjust based on your Redux store structure

  return (
    <>
      <Box>
        <Typography variant="h4" sx={{ color: "white", pb: 3 }}>
          Dashboard
        </Typography>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
        >
          <StatComponent
            value={company && company.postedJobs.length}
            icon={<WorkIcon sx={{ color: "#fafafa", fontSize: 30 }} />}
            description="Jobs Posted"
            money=''
          />
          <StatComponent
            value={company && company.applicationsReceived.length}
            icon={<WorkIcon sx={{ color: "#fafafa", fontSize: 30 }} />}
            description="Applications Received"
            money=''
          />
          <StatComponent
            value={company && company.activeJobs.length}
            icon={<WorkIcon sx={{ color: "#fafafa", fontSize: 30 }} />}
            description="Active Jobs"
            money=''
          />
          {/* Additional StatComponents for other company metrics */}
        </Stack>

        <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ mt: 3 }}
          spacing={{ xs: 1, sm: 2, md: 4 }}>
          <ChartComponent>
            <Chart
              chartType="Bar"
              data={data} // Replace with data from your backend
              options={options}
              width="100%"
              height="300px"
              legendToggle
            />
          </ChartComponent>
        </Stack>
      </Box>
    </>
  );
};

export default CompanyDashboard;
