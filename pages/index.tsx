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
    const setHover = () => setShowHover(true);
    setHover();
    window.addEventListener('mousemove', setHover);
    return () => window.removeEventListener('mousemove', setHover);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Host className={showHover ? 'show-hover' : ''}>
      <Time />
      <TimeRange />
    </Host>
  )
}
