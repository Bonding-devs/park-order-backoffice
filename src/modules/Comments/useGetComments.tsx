import { useEffect, useState } from 'react';
import { CommentModel } from '../../models/comment';
import { fetchComments, FetchCommentsParams } from '../../api/commentsApi';
import { useComments } from '../../context/CommentsContext';

export enum CommentFetchType {
  INITIAL,
  REMAINDER,
}

const isInitialFetch = (type: CommentFetchType) =>
  type === CommentFetchType.INITIAL;

const limit = 10;

export const useGetComments = (workOrderId: string) => {
  const [type, setType] = useState<CommentFetchType>(CommentFetchType.INITIAL);
  const [last, setLast] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [comments, setComments] = useState<CommentModel[]>([]);
  const { newComment, loadNewComment } = useComments();

  const getComments = async (): Promise<void> => {
    if(last || loading) return;
    setLoading(true);
    const params: FetchCommentsParams = isInitialFetch(type)
      ? { workOrderId, offset: 0, limit: 2 }
      : { workOrderId, offset: page * limit, limit };
    try {
      const response = await fetchComments(params);
      if (page === 0) {
        setComments(response);
      } else {
        setComments([...comments, ...response]);
      }
      if (response.length % params.limit !== 0 || response.length === 0) {
        setLast(true);
      }
    } catch (error) {
      console.error('Error Getting Comments:', error);
      setError('Error Getting Comments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (newComment) {
      createNewComment();
    }
  }, [newComment]);

  useEffect(() => {
    getComments();
  }, [page, type]);

  const createNewComment = () => {
    setLast(false);
    if (isInitialFetch(type)) {
      setType(CommentFetchType.REMAINDER);
    } else {
      setPage(0);
    }
    loadNewComment(false);
  };

  const changePage = () => {
    if (isInitialFetch(type)) {
      setType(CommentFetchType.REMAINDER);
      setPage(0);
    } else {
      setPage((prev) => prev + 1);
    }
  };

  return {
    comments,
    loading,
    error,
    setError,
    last,
    changePage,
  };
};
