const uuid = require('uuid');

module.exports = {
    createUUID: () => {
        const early_uuid = uuid.v4();
        let last_uuid = early_uuid.split('-');
        return last_uuid[0] + last_uuid[1] + last_uuid[2] + last_uuid[3];
    }
}