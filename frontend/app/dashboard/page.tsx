'use client';

import styled from 'styled-components';

export default function Home() {
  return (
    <div>
      <Container>
        <h1>Dashboard Page</h1>
      </Container>
    </div>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.5rem;
  font-size: 1rem;
`;
