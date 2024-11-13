import React, { useEffect, useState } from "react";
import { fetchProjects, deleteProject } from "../services/projectService";

const ProjectList = ({ token }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await fetchProjects(token);
        setProjects(response.data);
      } catch (error) {
        console.error("Failed to fetch projects", error);
      }
    };
    loadProjects();
  }, [token]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      await deleteProject(id, token);
      setProjects(projects.filter((project) => project._id !== id));
    }
  };

  return (
    <div>
      <h2>Project List</h2>
      <ul>
        {projects.map((project) => (
          <li key={project._id}>
            <strong>{project.name}</strong> - {project.description}
            <p>
              Assigned Users:{" "}
              {project.assignedUsers.map((user) => user.name).join(", ")}
            </p>
            <button onClick={() => handleDelete(project._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
