// This is the assets controller. Goal is to serve css, js, partials, images, or bower packages.
module.exports = {
    partials: {
        handler: {
            directory: { path: './public/partials' }
        },
        id : 'partials'
    },
    css: {
        handler: {
            directory: { path: './public/css' }
        },
        id : 'css'
    },
    js: {
        handler: {
            directory: { path: './public/js' }
        },
        id : 'js'
    },
    sounds: {
        handler: {
            directory: { path: './public/sounds' }
        },
        id : 'sounds'
    },
    imgs: {
      handler: {
        directory: { path: './public/imgs' }
      },
      id : 'imgs'
    },
    bower: {
        handler: {
            directory: { path: './bower_components' }
        },
        id : 'bower'
    }
}
