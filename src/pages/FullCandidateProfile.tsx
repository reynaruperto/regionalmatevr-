import { useParams } from 'react-router-dom';
import FullCandidateProfile from '@/components/FullCandidateProfile';

const FullCandidateProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  
  return <FullCandidateProfile candidateId={id || '1'} />;
};

export default FullCandidateProfilePage;