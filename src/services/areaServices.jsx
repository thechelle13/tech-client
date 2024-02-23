export const getAreas = () => {
    return fetch(`https://techpower-app-yx7il.ondigitalocean.app/areas`,
    {
        method: "GET",
        headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json"
        }
      }).then((res) => res.json())
  }

  export const getAreaByID = (areaId) => {
      return fetch(`https://techpower-app-yx7il.ondigitalocean.app/areas/${areaId}`,
      {
          method: "GET",
          headers: {
            Authorization: `Token ${token}`,
              "Content-Type": "application/json"
          }
          }).then((res) => res.json())
  }