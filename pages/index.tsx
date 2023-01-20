import FullscreenButton from '@/lib/fullscreenButton';
import { useTemporaryState } from '@/lib/hooks';
import NotesArea from '@/lib/notesArea';
import Time from '@/lib/time';
import TimeRange from '@/lib/timeRange';
import { useEffect } from 'react';
import styled from 'styled-components';

const Host = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 2em;
`;

const DetailsHost = styled.div`
  flex: 0px 1;
  margin-top: 2em;
  position: relative;
  width: 100%;
  max-width: 1000px;
`;

const Impressum = styled.div`
  text-align: center;
  opacity: 0.5;
  font-size: 0.75;
  margin-bottom: 0.5em;

  a {
    color: white;
  }
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
    <>
      <Host className={showHover ? 'show-hover' : ''}>
        <Time />
        <TimeRange />
        <DetailsHost>
          <NotesArea />
        </DetailsHost>
        <FullscreenButton />
      </Host>
      <Impressum>Impressum: <a href="https://ufind.univie.ac.at/de/person.html?id=52302">Stephan Troyer</a></Impressum>
    </>
  )
}
