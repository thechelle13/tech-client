export const getTechUser = () => {
  return fetch(`https://techpower-app-yx7il.ondigitalocean.app/users/techusers`, {
    method: "GET",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

export const editTechUser = (techuserId, updatedTechUser) => {
  return fetch(`https://techpower-app-yx7il.ondigitalocean.app/users/techusers/${techuserId}`, {
    method: "PUT",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedTechUser),
  });
};

export const deleteTechUser = (techuserId) => {
  return fetch(`https://techpower-app-yx7il.ondigitalocean.app/users/techusers/${techuserId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};


  