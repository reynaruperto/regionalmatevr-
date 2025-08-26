import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const WHVAboutYou = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to work experience since this stage is now consolidated
    navigate('/whv/work-experience');
  }, [navigate]);

  return null;
};

export default WHVAboutYou;