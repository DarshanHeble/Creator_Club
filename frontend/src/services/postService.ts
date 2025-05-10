export const createPost = async (postData: {
  userId: string;
  content: string;
  pollQuestion?: string;
  pollOptions?: string[];
  attachment?: File | null;
}) => {
  const formData = new FormData();
  formData.append("user_id", postData.userId);
  formData.append("content", postData.content);
  if (postData.pollQuestion) formData.append("poll_question", postData.pollQuestion);
  if (postData.pollOptions) {
    postData.pollOptions.forEach((option, index) =>
      formData.append(`poll_options[${index}]`, option)
    );
  }
  if (postData.attachment) {
    formData.append("media", postData.attachment);
  }

  const response = await fetch("http://127.0.0.1:8000/api/posts", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Failed to create post");
  }

  return response.json();
};