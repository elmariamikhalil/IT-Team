module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define(
    "Client",
    {
      name: DataTypes.STRING,
      contact: DataTypes.STRING,
      projectId: DataTypes.INTEGER,
    },
    {}
  );

  Client.associate = function (models) {
    Client.belongsTo(models.Project, { foreignKey: "projectId" });
  };

  return Client;
};
