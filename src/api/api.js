const Validacao = require('../utils/validation').default;
const passwordHash = require('../utils/passwordHash').passwordHash;

const azurePhotoSave = require('../azureService/azureStoragePhotos').azurePhotoSave;

module.exports = (app, repository) => {
    /** GET /USERS:id */
    app.get('/users/:id', async(req, res, next) => {
        repository.getByID(req.params.id, (err, user) => {
            if (err) return next(err)
            res.json({
                id: user._id,
                userName: user.name,
                pic: user.profilePicture
            })
        })
    })

    /** POST /USERS */
    app.post('/users/', async(req, res, next) => {
        Validacao.isRequired(req.body.name, 'warming: Name field is required');
        Validacao.isRequired(req.body.email, 'warming: E-mail field is required');
        Validacao.hasMinLen(req.body.password, 8, "A senha deve ter no mínimo 8 caracteres");
        if (!Validacao.isValid()) {
            res.status(400).send(Validacao.errors()).end()
            return
        }

        Validacao.isValidEmail(req.body.email, (err) => { 
            if(err) {
                res.status(400).json({message: err.message});
            } else {
                repository.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: passwordHash(req.body.password),
                    profilePicture: 'https://thingstorage.blob.core.windows.net/profile-pictures/user-out.png',
                    first_entry: new Date(),
                }, err => {
                    if (err) return next(err)
                    res.json({message: 'Sucesso: new user'});
                })
            }
        });

    });

    /** PUT /USERS:id */
    app.put('/users/:id', async(req, res, next) => {
        try {
            let pic = req.body.profilePicture;
            let picName = await azurePhotoSave(pic);
            repository.updateProfileByID(req.params.id, {
                name: req.body.name,
                profilePicture: 'https://thingstorage.blob.core.windows.net/profile-pictures/' + picName? null : 'https://thingstorage.blob.core.windows.net/profile-pictures/user-out.png',
            }, err => {
                if (err) return next(err)
                res.json({message: 'Usuario Alterado'})
            });
        } catch(e) {
            console.log(e);
            res.status(500).send({
                message: 'Erro: update error'
            })
        }
    });
}
