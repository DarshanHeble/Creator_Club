export const createPost = async (postData: {
  postContent: string;
  pollQuestion?: string;
  pollOptions?: string[];
  attachment?: File | null;
}) => {
  const formData = new FormData();

  // Append text fields
  formData.append("post_content", postData.postContent);
  if (postData.pollQuestion) formData.append("poll_question", postData.pollQuestion);
  if (postData.pollOptions) {
    postData.pollOptions.forEach((option, index) =>
      formData.append(`poll_options[${index}]`, option)
    );
  }

  // Append file if it exists
  if (postData.attachment) {
    formData.append("media", postData.attachment);
  }

  try {
    const response = await fetch("http://127.0.0.1:8000/posts", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Failed to create post");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};