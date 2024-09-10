import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { mergeUniqueElementsById } from '../../utils/mergeUniqueElementsById';
import { fetchTeams } from '../../api/teamsApi';

export const useTeams = () => {
  const listInnerRef = useRef();
  const [teams, setTeams] = useState([]);
  const [teamsDropdownWO, setTeamsDropdownWO] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [currPage, setCurrPage] = useState(0);
  const [prevPage, setPrevPage] = useState(0);
  const [offset, setOffSet] = useState(0);
  const limit = 10;

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    getTeamsDropdown();
  }, []);

  const getTeams = async ({ params = {}, paginate = {} }) => {
    try {
      const teamsResponse = await fetchTeams({
        ...params,
        ...paginate,
      });

      setError(null);
      return teamsResponse;
    } catch (err) {
      setError('Failed to fetch teams');
    }
  };

  const reFetchDataTeams = () => {
    onLoadPaginateData({
      params: {},
      filter: 'all',
      paginate: { offset, limit },
    });
  };

  const onLoadPaginateData = async ({ params, filter = 'all', paginate }) => {
    setLoading(true);
    try {
      const teamsResponse = await getTeams({
        params,
        paginate,
      });

      if (filter != 'all') {
        setOffSet(0);
        setPrevPage(0);
        setCurrPage(0);
        setTeams(teamsResponse);
      } else {
        const counterResponse = teamsResponse.length < limit ? 0 : 1;
        setPrevPage(currPage);
        setCurrPage(currPage + counterResponse);
        setTeams(mergeUniqueElementsById(teams, teamsResponse));
      }
      setError(null);
    } catch (err) {
      setError('Failed to fetch teams');
    } finally {
      setLoading(false);
    }
  };

  const getTeamsDropdown = async () => {
    try {
      const teamsResponse = await getTeams({ params: {}, paginate: {} });

      setTeamsDropdownWO(teamsResponse);

      setError(null);
    } catch (err) {
      setError('Failed to fetch teams');
    } finally {
      setLoading(false);
    }
  };

  return {
    teams,
    teamsDropdownWO,
    loading,
    error,
    getTeams,
    reFetchDataTeams,
    register,
    handleSubmit,
    listInnerRef,
    onFilterWorkOrder: onLoadPaginateData,
    control,
    errors,
  };
};
