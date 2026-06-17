

let canSend = true;
function sendResponse(obj, res) {
  if(canSend) {
    res.status(obj.status_code).json(obj);
    canSend = false;
  } else throw new Error("Chiamata a sendResponse() gia effettuata");
}

export function validateCharacter(req,res,next) {
    canSend = true;

    const name = req.body.name;
    const healthPoints = req.body.healthPoints;
    const characterClass = req.body.characterClass;
    const subclass = req.body.subclass;
    const species = req.body.species;
    const background = req.body.background;
    const level = req.body.level;
    const levelSpecifics = req.body.levelSpecifics;
    const equipment = req.body.equipment;
    const proficiencies = req.body.proficiencies;
    const languages = req.body.languages;
    const speed = req.body.speed;
    const size = req.body.size;
    const statistics = req.body.statistics;

    if (name === undefined) {
        sendResponse({
            status_code: 400,
            message: 'Nome inserito non valido',
            success: false,
        }, res);
    }
    else if (healthPoints === 0 || healthPoints === undefined) {
        sendResponse({
            status_code: 400,
            message: 'Punti vita inseriti non validi',
            success: false,
        }, res);
    }
    else if (characterClass === undefined) {
        sendResponse({
            status_code: 400,
            message: 'Classe inserita non valida',
            success: false,
        }, res);
    }
    else if (subclass === undefined && level >= 3) {
        sendResponse({
            status_code: 400,
            message: 'Sottoclasse vuota quando non dovrebbe esserlo',
            success: false,
        }, res);
    } 
    else if (species === undefined) {
        sendResponse({
            status_code: 400,
            message: 'Specie inserita non valida',
            success: false,
        }, res);
    }
    else if (background === undefined) {
        sendResponse({
            status_code: 400,
            message: 'Background inserito non valido',
            success: false,
        }, res);
    }
    else if (level<= 0 || level > 20) {
        sendResponse({
            status_code: 400,
            message: 'Livello inserito non valido',
            success: false,
        }, res);
    }
    else if (levelSpecifics === undefined) {
        sendResponse({
            status_code: 400,
            message: 'Specifiche di livello non valide',
            success: false,
        }, res);
    }
    else if (equipment === undefined || equipment.length === 0) {
        sendResponse({
            status_code: 400,
            message: 'Equipaggiamento inserito non valido',
            success: false,
        }, res);
    }
    else if (proficiencies === undefined || proficiencies.length === 0) {
        sendResponse({
            status_code: 400,
            message: 'Competenze inserite non valide',
            success: false,
        }, res);
    }
    else if (languages === undefined || languages.length < 2) {
        sendResponse({
            status_code: 400,
            message: 'Lingue inserite non valide',
            success: false,
        }, res);
    }
    else if (speed === undefined || speed === 0) {
        sendResponse({
            status_code: 400,
            message: 'Velocita\' inserita non valida',
            success: false,
        }, res);
    }
    else if (size === undefined) {
        sendResponse({
            status_code: 400,
            message: 'Taglia inserita non valida',
            success: false,
        }, res);
    }
    else if (statistics === undefined) {
        sendResponse({
            status_code: 400,
            message: 'Statistiche inserite non valide',
            success: false,
        }, res);
    }
    else next();
}

export default {
    validateCharacter,
}