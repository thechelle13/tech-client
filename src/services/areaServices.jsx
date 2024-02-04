export const getAreas = () => {
    return fetch(`https://techpower-api-lgumq.ondigitalocean.app/areas`,
    {
        method: "GET",
        headers: {
            Authorization: `Token ${localStorage.getItem("auth_token")}`,
            "Content-Type": "application/json"
        }
      }).then((res) => res.json())
  }

  export const getAreaByID = (areaId) => {
      return fetch(`https://techpower-api-lgumq.ondigitalocean.app/areas/${areaId}`,
      {
          method: "GET",
          headers: {
              Authorization: `Token ${localStorage.getItem("auth_token")}`,
              "Content-Type": "application/json"
          }
          }).then((res) => res.json())
  }