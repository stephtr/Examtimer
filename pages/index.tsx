import { useTemporaryState } from '@/lib/hooks';
import Time from '@/lib/time';
import TimeRange from '@/lib/timeRange';
import { useEffect } from 'react';
import styled from 'styled-components';

const Host = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`;

export default function Home() {
  const [showHover, setShowHover] = useTemporaryState(false, 5000);

  useEffect(() => {
    const mouseMove = () => setShowHover(true);
    window.addEventListener('mousemove', mouseMove);
    return () => window.removeEventListener('mousemove', mouseMove);
  });

  return (
    <Host className={showHover ? 'show-hover' : ''}>
      <Time />
      <TimeRange />
    </Host>
  )
}
