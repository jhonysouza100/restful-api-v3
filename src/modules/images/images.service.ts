import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import type { UploadApiErrorResponse, UploadApiResponse } from "cloudinary";
import { v2 as cloudinary } from "cloudinary";
import { envs } from 'src/common/config';
import { ImageDataResponse } from 'src/modules/images/interfaces/image-response.interface';

// Configuración de Cloudinary
cloudinary.config({
  cloud_name: envs.CLOUDINARY_CLOUD_NAME,
  api_key: envs.CLOUDINARY_API_KEY,
  api_secret: envs.CLOUDINARY_API_SECRET,
});

@Injectable()
export class ImagesService {

  // !!! require npm i -D @types/multer
  async uploadImages(files: Express.Multer.File[]): Promise<ImageDataResponse[]> {
    if(!files || files.length === 0) {
      throw new BadRequestException('No valid files uploaded');
    }

    const uploadedImages: ImageDataResponse[] = [];

    for (const file of files) {
      // Verificar que el archivo sea una imagen
      if(!file.mimetype.startsWith("image/")) {
        throw new BadRequestException('Only images format is premited');
      }
      const buffer = file.buffer;

      try {
        const uploadResult: UploadApiResponse = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            { folder: "products", resource_type: "image" },
            (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
              if (error) {
                return reject(error);
              }
              if (result) {
                return resolve(result);
              }
              return reject(new Error("No se recibió respuesta de Cloudinary"));
            }
          ).end(buffer);
        });

        uploadedImages.push({
          public_id: uploadResult.public_id,
          secure_url: uploadResult.secure_url,
        });
      } catch (error) {
        // !!! console.error(`${file.originalname}`, error);
        throw new HttpException(
          `${error.message}: ${file.originalname}`,
          error.http_code || HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }

    return uploadedImages;
  }

  async removeImage(public_id: string) {
    await cloudinary.uploader.destroy(public_id);
  }
}
