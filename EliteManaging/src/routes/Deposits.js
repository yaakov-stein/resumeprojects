import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits() {
  return (
    <React.Fragment>
      <Title>Recent Deposits</Title>
      <Typography component="p" variant="h4" color='mediumseagreen'>
        $3,024.00
      </Typography>
      <Typography color="mediumseagreen" sx={{ flex: 1 }}>
        on 15 March, 2019
      </Typography>
      <div>
        <Link href="#" onClick={preventDefault} style={{color : 'mediumseagreen'}}>
          View balance
        </Link>
      </div>
    </React.Fragment>
  );
}
