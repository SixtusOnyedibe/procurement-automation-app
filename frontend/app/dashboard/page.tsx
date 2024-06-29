'use client';

import styled from 'styled-components';
import PurchaseDetails from '../../components/order/purchase-details';

export default function Home() {
  return (
    <Container>
      <PurchaseDetails />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
`;
