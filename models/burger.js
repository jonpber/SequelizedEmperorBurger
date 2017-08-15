module.exports = function(sequelize, Datatypes){
	var Burger = sequelize.define("Burger", {
		burger_name: {
			type: Datatypes.STRING,
			allowNull: false,
			validate: {
		    	len: [1,14]
			}
		},
		devoured: {
			type: Datatypes.BOOLEAN,
			defaultValue: false
		}
	});

	Burger.associate = function(models){
		Burger.belongsTo(models.Customer, {
			foreignKey: {
				allowNull: false
			}
		})
	}

	return Burger;

}

