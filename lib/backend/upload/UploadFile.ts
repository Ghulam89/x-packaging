import multer from 'multer'
import path  from 'path'
import type { Request } from "express";

const backendImagesDir = path.join(process.cwd(), "lib", "backend", "images");

const storage = multer.diskStorage({
    destination: function (_req: Request, _file: any, cb: (error: Error | null, destination: string) => void) {
        cb(null, backendImagesDir);
    },
    filename: function (_req: Request, file: any, cb: (error: Error | null, filename: string) => void) {
        // Use the fieldname + original filename
        cb(null, `${file.originalname}`);
    },
});

const fileFilter = (_req: Request, file: any, callBack: (error: Error | null, acceptFile?: boolean) => void) => {
    const fileTypes = /jpeg|jpg|png|webp|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());

    if (mimeType && extname) {
        return callBack(null, true);
    }
    callBack(new Error('Error: Only image files (jpeg, jpg, png, gif) are allowed!'));
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 3145728 },
    fileFilter: fileFilter
});

export const uploadBrandImages = upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'bannerImage', maxCount: 1 }
]);

export const uploadProductImages = upload.fields([
    { name: 'images', maxCount: 15},
    { name: 'bannerImage', maxCount: 1 }
]);

export const uploadCategoryImages = upload.fields([
    { name: 'image', maxCount:1},
    { name: 'icon', maxCount: 1 },
    { name: 'bannerImageFirst', maxCount: 1 },
    { name: 'bannerImageSecond', maxCount: 1 },
    { name: 'bannerImageThird', maxCount: 1 },
    { name: 'faqImage', maxCount: 1 },
]);

export const uploadBannerImages = upload.fields([
    { name: 'image', maxCount:1},
]);

export const uploadBlogImages = upload.fields([
    { name: 'image', maxCount:1},
]);

export const uploadInstantQuoteImages = upload.fields([
    { name: 'image', maxCount:1},
]);

export const uploadRequestQuoteImages = upload.fields([
    { name: 'image', maxCount:1},
]);

export const uploadEditorImage = upload.single('image');