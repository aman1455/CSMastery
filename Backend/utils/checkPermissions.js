const customError = require('../errors');

const checkPermission = (requestUser,resourceId)=>{
    if(requestUser.role === 'admin') return;
    if(requestUser.userId === resourceId.toString()) return;
    throw new customError.UnauthorizedError('Not authorized to access this route');

}

module.exports = checkPermission;