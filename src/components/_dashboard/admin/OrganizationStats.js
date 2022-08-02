import { Icon } from '@iconify/react';
import peopleFill from '@iconify/icons-eva/people-fill';
// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.primary.darker,
  backgroundColor: theme.palette.grey['0'],
  border: '1px solid #e2e2e2',
  borderRadius: 5
}));

const CardContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '0 2rem',
  alignItems: 'center'
  // width: ''
}));

const CardStats = styled('div')(({ theme }) => ({
  // marginLeft: '1rem'
}));

const StatsData = styled('div')(({ theme }) => ({
  margin: '1rem'
}));

const CardStatsData = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  margin: '2rem'
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  marginLeft: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  color: theme.palette.primary.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0)} 0%, ${alpha(
    theme.palette.primary.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------

const TOTAL = 14;

export default function OrganizationStats() {
  return (
    <RootStyle>
      <CardContainer>
        <CardStats>
          <Typography variant="subtitle2">Organization Stats</Typography>
          <Typography variant="h2">NITEL</Typography>
        </CardStats>
        <CardStatsData>
          <StatsData>
            <Typography variant="span">12</Typography>
            <Typography variant="subtitle2">NITEL</Typography>
          </StatsData>
          <StatsData>
            <Typography variant="span">23</Typography>
            <Typography variant="subtitle2">NITEL</Typography>
          </StatsData>
          <StatsData>
            <Typography variant="span">4</Typography>
            <Typography variant="subtitle2">NITEL</Typography>
          </StatsData>
        </CardStatsData>
      </CardContainer>
    </RootStyle>
  );
}
