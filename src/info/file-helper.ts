export const imageFileFilter = (req: any, file: any, callback: any) => {
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
        // req.fileValidationError = 'Only .jpg, .jpeg, .png Image extension allowed....';
        return callback(null, false)
    }
    callback(null, true);
};