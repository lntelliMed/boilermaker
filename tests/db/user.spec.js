// TO-DO:
// Likewise, let's consider what makes good Sequelize test cases:

// Any methods that you write deserve tests(instanceMethods, classMethods, hooks, and model validator methods)
// Do not write tests for code that Sequelize owns - methods like findAll, create, update, etc, and field validations like allowNull.
// Extra note on validations: generally, you should only test model validator methods - the non - trivial methods that you write to validate your model instances.Simple validations like allowNull and other field aspects like defaultValue should not be tested by you - they are Sequelize's responsibility.

// For example, in the following model(from the Sequelize docs):

// const Pub = Sequelize.define('pub', {
//   name: { type: Sequelize.STRING },
//   address: { type: Sequelize.STRING },
//   latitude: {
//     type: Sequelize.INTEGER,
//     allowNull: true,
//     defaultValue: null,
//     validate: { min: -90, max: 90 }
//   },
//   longitude: {
//     type: Sequelize.INTEGER,
//     allowNull: true,
//     defaultValue: null,
//     validate: { min: -180, max: 180 }
//   },
// }, {
//     validate: {
//       bothCoordsOrNone() {
//         if ((this.latitude === null) !== (this.longitude === null)) {
//           throw new Error('Require either both latitude and longitude or neither')
//         }
//       }
//     }
//   });
// You would write tests for bothCoordsOrNone, because it contains logic that you are responsible for.However, you would not test the allowNull or defaultValue for the latitude / longitude fields.You should also not test the individual min / max validation on each of those fields either - they are just simple values, and the logic for validating them belongs to Sequelize.When in doubt, a good rule of thumb is that if you had to write some logic, or do anything more than simply supply a value, you should test it.
