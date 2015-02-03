// This is the assets controller. Goal is to serve css, js, partials, images, or bower packages.
module.exports = {
    scripts: {
        handler: {
            directory: { path: './public/scripts' }
        },
        id : 'scripts'
    },
    styles: {
        handler: {
            directory: { path: './public/styles' }
        },
        id : 'styles'
    },
    views: {
      handler: {
        directory: { path: './public/views' }
      },
      id : 'views'
    },
    sounds: {
        handler: {
            directory: { path: './public/sounds' }
        },
        id : 'sounds'
    },
    images: {
      handler: {
        directory: { path: './public/images' }
      },
      id : 'images'
    },
    bower: {
        handler: {
            directory: { path: './bower_components' }
        },
        id : 'bower'
    }
}
