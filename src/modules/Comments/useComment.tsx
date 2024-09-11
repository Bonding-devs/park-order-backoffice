import { useState } from 'react';
import { createComment } from '../../api/commentsApi';
import { CreateComment } from '../../models/comment';

export const useComment = () => {
  const [commentText, setCommentText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (comment: CreateComment) => {
    setLoading(true);
    try {
      await createComment(comment);
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
