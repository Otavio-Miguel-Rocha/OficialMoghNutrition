import { Injectable } from "@angular/core";
import { Nutricionista } from "../app/interfaces/nutricionista";
import * as CryptoJS from 'crypto-js';

@Injectable()
export class CriptografiaService {
    
    constructor(){}

    private secretKey: string = 'chave-secreta'; // Chave secreta para criptografia

    encryptData(data: string): string {
      const encryptedData = CryptoJS.AES.encrypt(data, this.secretKey).toString();
      return encryptedData;
    }
    decryptData(encryptedData: string): Nutricionista[] {
      const bytes = CryptoJS.AES.decrypt(encryptedData, this.secretKey);
      const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
      return JSON.parse(decryptedData);
    }
}