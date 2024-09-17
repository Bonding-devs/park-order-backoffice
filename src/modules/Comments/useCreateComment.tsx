import { useState } from 'react';
import { createComment } from '../../api/commentsApi';
import { CreateComment } from '../../models/comment';
import { useComments } from '../../context/CommentsContext';

export const useCreateComment = () => {
  const [commentText, setCommentText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {loadNewComment} = useComments();

  const onSubmit = async (comment: CreateComment) => {
    setLoading(true);
    try {
      await createComment(comment);
      loadNewComment(true);
      setCommentText('')
    } catch (error) {
      setError('Error Creating Comment');
    } finally {
      setLoading(false);
    }
  };

  return {
    onSubmit,
    loading,
    error,
    setError,
    commentText,
    setCommentText
  };
};
