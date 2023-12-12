export const getTechUser = (id) => {
    return fetch(`http://localhost:8000/techusers/${id}`,
    {
        method: "GET",
        headers: {
            Authorization: `Token ${localStorage.getItem("auth_token")}`,
            "Content-Type": "application/json"
        }
      }).then((res) => res.json())
  }

  