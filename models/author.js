var mongoose = require ('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema(
{
	first_name: {type: String, required: true, max: 100},
	family_name: {type: String, required: true, max: 100},
	date_of_birth: {type: Date},
	date_of_death: {type: Date},
}
);

//Virtual for author's full name
AuthorSchema
.virtual('name')
.get(function(){
	return this.family_name + ', ' + this.first_name
})

//Virtual for author's lifespan
AuthorSchema
.virtual('lifespan')
.get(function(){
	return (this.date_of_birth_formatted + " to " +  this.date_of_death_formatted).toString();
});

//Virtual for author's URL
AuthorSchema
.virtual('url')
.get(function(){
	return '/catalog/author/' + this.id;

});

//Virtual for Author's birth date formatted
AuthorSchema
.virtual('date_of_birth_formatted')
.get(function(){
	return this.date_of_birth ? moment(this.date_of_birth).format('YYYY-MM-DD') : '';
})

//Virtual for Author's death date formatted
AuthorSchema
.virtual('date_of_death_formatted')
.get(function(){
	return this.date_of_death ? moment(this.date_of_death).format('YYYY-MM-DD') : '';
})

//Export model
module.exports = mongoose.model('Author', AuthorSchema);