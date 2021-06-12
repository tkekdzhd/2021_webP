const User = require('../../models/User');

const verifyId = async (id) => {
    try {
        const user = await User.findOne({ _id: id });

        if (user) {
            return true;
        } else return false;
    } catch (err) {
        return false;
    }
}

module.exports = verifyId;