const SequelizeFile = require('sequelize-file');

const picture = new SequelizeFile({
    attribute: 'picture',
    mimetype: /^image/,
    crop: true,
    sizes: {
        small: 64, //width 64
        big: 150, //width 150
    }
});

const backgroundImage = new SequelizeFile({
    attribute: 'backgroundImage',
    mimetype: /^image/,
    crop: true,
    sizes: {
        preview: "x350" // height 350
    }
});

module.exports = {
    picture,
    backgroundImage
}