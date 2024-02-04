export const getSkills = () => {
    return fetch(`https://techpower-api-lgumq.ondigitalocean.app/skills`, {
      method: "GET",
      headers: {
        Authorization: `Token ${localStorage.getItem("auth_token")}`,
        "Content-Type": "application/json"
      }
    }).then((res) => res.json())
  }
  
  export const getSkillsByID = (skillId) => {
    return fetch(`https://techpower-api-lgumq.ondigitalocean.app/skills/${skillId}`, {
      method: "GET",
      headers: {
        Authorization: `Token ${localStorage.getItem("auth_token")}`,
        "Content-Type": "application/json"
      }
    }).then((res) => res.json())
  }
  
  export const createSkill = (skill) => {
    return fetch(`https://techpower-api-lgumq.ondigitalocean.app/skills`, {
      method: "POST",
      headers: {
        Authorization: `Token ${localStorage.getItem("auth_token")}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(skill)
    }).then((res) => res.json())
  }
  
  export const editSkill = (skill) => {
    return fetch(`https://techpower-api-lgumq.ondigitalocean.app/skills/${skill.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Token ${localStorage.getItem("auth_token")}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(skill)
    })
  }
  
  export const deleteSkill = (skillId) => {
    return fetch(`https://techpower-api-lgumq.ondigitalocean.app/skills/${skillId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${localStorage.getItem("auth_token")}`,
      },
    })
  }
  