import { useParams } from 'react-router-dom';
import CandidateProfileCard from '@/components/CandidateProfileCard';

const CandidateProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  
  return <CandidateProfileCard candidateId={id || '1'} />;
};

export default CandidateProfilePage;