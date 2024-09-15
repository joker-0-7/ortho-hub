export const getUsersCount = async (token) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/users/count`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
};

export const getSubjectCount = async (token) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API}/questions/subjects-count`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await res.json();
  return data.count;
};
export const getActiveUserCount = async (token) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API}/users/user-active-count`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await res.json();
  return data.count;
};

export const deleteUser = async (id) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API}/users/user/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  return data;
};

export const fetchQuestions = async (state, current, pageSize) => {
  if (!state?.accessToken) return;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API}/get-questions/${current}/${pageSize}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.accessToken}`,
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching questions:", error);
  }
};
