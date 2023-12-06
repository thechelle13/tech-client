export const getAreas = () => {
    return fetch(`http://localhost:8000/areas`,
    {
        method: "GET",
        headers: {
            Authorization: `Token ${localStorage.getItem("auth_token")}`,
            "Content-Type": "application/json"
        }
      }).then((res) => res.json())
  }

  export const getAreaByID = (areaId) => {
      return fetch(`http://localhost:8000/areas/${areaId}`,
      {
          method: "GET",
          headers: {
              Authorization: `Token ${localStorage.getItem("auth_token")}`,
              "Content-Type": "application/json"
          }
          }).then((res) => res.json())
  }