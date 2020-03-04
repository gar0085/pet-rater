const Pet = require('../models/pet');

module.exports = {
	new: newPet,
	create,
	show,
	delete: deletePet,
	comment
};

function newPet(req, res) {
	res.render('pets/new', {
		title: 'New Pet',
		user: req.user
	});
}

function create(req, res) {
	const pet = { ...req.body, postedBy: req.user, owner: req.user.name };
	Pet.create(pet, err => {
		if (err) return res.redirect('main/new');
		res.redirect('/main');
	});
}

function show(req, res) {
	Pet.findById(req.params.id, (err, pet) => {
		res.render('pets/show', {
			title: 'Pet Profile',
			pet,
			user: req.user
		});
	});
}

function deletePet(req, res) {
	Pet.findById(req.params.id, (err, pet) => {
		pet.delete();
		res.redirect(`/main`);
	});
}

function comment(req, res) {}
