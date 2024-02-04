export const getTechUser = () => {
  return fetch(`https://techpower-api-lgumq.ondigitalocean.app/users/techusers`, {
    method: "GET",
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

export const editTechUser = (techuserId, updatedTechUser) => {
  return fetch(`https://techpower-api-lgumq.ondigitalocean.app/users/techusers/${techuserId}`, {
    method: "PUT",
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedTechUser),
  });
};

export const deleteTechUser = (techuserId) => {
  return fetch(`https://techpower-api-lgumq.ondigitalocean.app/users/techusers/${techuserId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
  });
};


  