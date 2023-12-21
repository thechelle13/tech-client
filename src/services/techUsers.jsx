  export const getTechUser = () => {
    return fetch(`http://localhost:8000/users/techusers`, {
      method: "GET",
      headers: {
        Authorization: `Token ${localStorage.getItem("auth_token")}`,
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  };

  // export const editTechUser = (techuserId) => {
  //   return fetch(`http://localhost:8000/users/techusers/${techuserId}`,
  //   {
  //       method: "PUT",
  //       headers: {
  //           Authorization: `Token ${localStorage.getItem("auth_token")}`,
  //           "Content-Type": "application/json"
  //       },
  //           body: JSON.stringify(techuserId)
  //       })
  //   }

  export const editTechUser = (techuserId, updatedTechUser) => {
    return fetch(`http://localhost:8000/users/techusers/${techuserId}`, {
      method: "PUT",
      headers: {
        Authorization: `Token ${localStorage.getItem("auth_token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTechUser), // Use updatedTechUser instead of techuserId
    });
  };
  

    export const deleteTechUser = (techuserId) => {
        return fetch(`http://localhost:8000/users/techusers/${techuserId}`, 
        {
            method: "DELETE",
            headers: {
                Authorization: `Token ${localStorage.getItem("auth_token")}`,
            },
        })
    }

  