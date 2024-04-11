const validarMedia = (req) => {
    const validaciones = [];
    if (!req.body.serial) {
        validaciones.push("serial es requerido");
    }
    if (!req.body.titulo) {
        validaciones.push("titulo es requerido");
    }
    if (!req.body.sinopsis) {
        validaciones.push("sinopsis es requerido");
    }
    if (!req.body.urlPelicula) {
        validaciones.push("urlPelicula es requerido");
    }
    if (!req.body.imagen) {
        validaciones.push("imagen es requerido");
    }
    if (!req.body.añoEstreno) {
        validaciones.push("añoEstreno es requerido");
    }
    if (!req.body.generoPrincipal) {
        validaciones.push("generoPrincipal es requerido");
    }
    if (!req.body.directorPrincipal) {
        validaciones.push("director principal es requerido");
    }
    if (!req.body.productora) {
        validaciones.push("productora es requerida");
    }
    if (!req.body.tipo) {
        validaciones.push("tipo es requerido");
    }
    return validaciones;
};

module.exports = {
    validarMedia,
};
