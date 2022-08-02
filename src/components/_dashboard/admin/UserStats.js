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
  color: theme.palette.secondary.darker,
  backgroundColor: theme.palette.grey['0'],
  border: '1px solid #e2e2e2'
}));

const CardContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  padding: '0 2rem',
  alignItems: 'center'
  // width: ''
}));

const CardStats = styled('div')(({ theme }) => ({
  // marginLeft: '1rem'
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  marginLeft: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  color: theme.palette.secondary.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.secondary.dark, 0)} 0%, ${alpha(
    theme.palette.primary.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------

const TOTAL = 14;

export default function UserStats(props) {
  return (
    <RootStyle>
      <CardContainer>
        <CardStats>
          <Typography variant="h2">{props.statcount}</Typography>
          <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
            {props.statname}
          </Typography>
        </CardStats>
        <IconWrapperStyle>
          <Icon icon={peopleFill} width={48} height={48} />
        </IconWrapperStyle>
      </CardContainer>
    </RootStyle>
  );
}
