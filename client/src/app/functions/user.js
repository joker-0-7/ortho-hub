export const fetchData = async (token) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return data.count;
};
export const getSolvedQuestions = async (token) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/users/solved-count`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  console.log(data.solved);

  return data.solved;
};

export const getQuestionsCount = async (token) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API}/users/questions-count`,
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
export const getMessagesCount = async (token) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API}/users/contact-count`,
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

export const resetInformation = async (token) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API}/users/reset-information`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await res.json();
  if (!res.ok) throw new Error();
  return data;
};

export const previousQuestions = async (token, type, current, pageSize) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API}/users/previous-questions/${type || "all"}/${
      current || 1
    }/${pageSize || 10}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await res.json();
  return data;
};
