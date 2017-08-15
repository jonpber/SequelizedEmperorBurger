module.exports = function(sequalize, Datatypes){
	var Customer = sequalize.define("Customer", {
		name: {
			type: Datatypes.STRING,
			allowNull: false,
			validate: {
		    	len: [1,14]
			}
		},
	});

	Customer.associate = function(models){
		Customer.hasMany(models.Burger, {
			onDelete: "cascade"
		})
	}

	return Customer;
}

