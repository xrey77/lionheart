import {
    BadRequestException,
    Body,
    Controller,
    FileTypeValidator,
    HttpException,
    Param,
    ParseFilePipe,
    Patch,
    Post,
    UploadedFile,
    UploadedFiles,
    UseInterceptors,
    UsePipes,
    ValidationPipe,
  } from '@nestjs/common';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { diskStorage } from 'multer';
import { extname } from 'path';
import { Express } from "Express"
import { FileTypeValidationPipe} from '../pipes/file-type-validation.pipe'
import { imageFileFilter } from './file-helper'
import { request } from 'http';
import { contains } from 'class-validator';
import * as path from 'path';
import * as sharp from 'sharp';
import * as fs from 'fs'
import { InfoService } from './info.service';
import { UpdateInfodto } from 'src/dto/UpdateInfo.dto';

@Controller('info')
@UsePipes(
    new ValidationPipe({
        whitelist: true,
        transform: true
    })
)
export class InfoController {
  
    constructor(        
        private readonly infoService: InfoService) {}

    @Patch('updateuserpic/:id')    
    @UseInterceptors(FileInterceptor('file', {       
        fileFilter: imageFileFilter, 
        storage: diskStorage({            
            destination: 'public/images/users',
            filename: (req: any, file: any, callback) => {
                const uniqueSuffix = req.params['id'];
                const ext = extname(file.originalname);
                const filename = 'x' + `${uniqueSuffix}${ext}`                
                callback(null, filename);                          
                // sharp(file.path + '/' + file.originalname)
                // .resize(300)
                // .webp({effort: 3})            
                // .toFile(path.join('public/images/users', filename))
    
            }
            
        })        
    }))
    async uploadPicture(@UploadedFile() file: any, @Param() id: any) {            
        if (!file) {
            throw new BadRequestException('Only .jpg, .jpeg, .png Image extension allowed....')
        }

        let idno: string = id.id
 
        const ext = extname(file.originalname);
        let newFile = `${idno}${ext}`;
        let oldFile = 'x'+`${idno}${ext}`;
        try {
            await sharp(file.path)
            .resize(300)
            .webp({effort: 3})                        
            .toFile(path.join('public/images/users', newFile))
        } catch(error) {}
        fs.unwatchFile('public/images/users/' + oldFile)
        fs.unwatchFile('public/images/users/' + newFile)
        if (fs.existsSync('public/images/users/' + oldFile)) {
            fs.unlink('public/images/users/' + oldFile, (err: any) => {
            if (err) {
                console.error(err);
            }            
            });  
        }
        let updateInfodto = new UpdateInfodto();
        updateInfodto.profilepic = newFile;
        this.infoService.updateProfilepic(id, updateInfodto)
        return {message: "File uploaded successfully.", statuCode: 200}

    }

}




/*
@UploadedFile(
    new ParseFilePipe({
        validators: [
            new FileTypeValidator({fileType: /\.(jpg|jpeg|png)$/}),
        ],
    })
)
*/