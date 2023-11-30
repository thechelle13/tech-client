export const getSkills = () => {
    return fetch(`http://localhost:8000/skills`,
    {
        method: "GET",
        headers: {
            Authorization: `Token ${localStorage.getItem("auth_token")}`,
            "Content-Type": "application/json"
        }
      }).then((res) => res.json())
  }

  export const getSkillsByID = (tagId) => {
      return fetch(`http://localhost:8000/skills/${skillId}`,
      {
          method: "GET",
          headers: {
              Authorization: `Token ${localStorage.getItem("auth_token")}`,
              "Content-Type": "application/json"
          }
          }).then((res) => res.json())
  }

  export const createSkill = (skill) => {
    return fetch(`http://localhost:8000/skills`,
    {
        method: "POST",
        headers: {
            Authorization: `Token ${localStorage.getItem("auth_token")}`,
            "Content-Type": "application/json"
        },
            body: JSON.stringify(skill)
        }).then((res) => res.json())
    }

  export const editSkill = (skill) => {
    return fetch(`http://localhost:8000/skills/${skill.id}`,
    {
        method: "PUT",
        headers: {
            Authorization: `Token ${localStorage.getItem("auth_token")}`,
            "Content-Type": "application/json"
        },
            body: JSON.stringify(skill)
        })
    }

    export const deleteSkill = (skillId) => {
        return fetch(`http://localhost:8000/tags/${skillId}`, 
        {
            method: "DELETE",
            headers: {
                Authorization: `Token ${localStorage.getItem("auth_token")}`,
            },
        })
    }