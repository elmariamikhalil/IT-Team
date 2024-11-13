module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define(
    "Project",
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      userId: DataTypes.INTEGER,
    },
    {}
  );

  Project.associate = function (models) {
    Project.belongsTo(models.User, { foreignKey: "userId" });
    Project.hasMany(models.Client, { foreignKey: "projectId" });
  };

  return Project;
};
