import { promisify } from "util";
import { gzip, gunzip } from "zlib";

export class CipherSystem {
  static async compress(message: string): Promise<string> {
    try {
      // Promisify the gzip function to work with async/await
      const gzipAsync = promisify(gzip);

      // Compress the message content
      const compressedMessage = await gzipAsync(Buffer.from(message));

      // Convert the compressed message to base64 encoding
      const base64Message = compressedMessage.toString("base64");

      return `data:application/gzip;base64,${base64Message}`;
    } catch (error) {
      console.error("Error compressing message:", error);
      throw error;
    }
  }

  static async decode(compressedMessage: string): Promise<string> {
    try {
      // Check if the compressedMessage contains the expected prefix
      const prefix = "data:application/gzip;base64,";
      if (!compressedMessage.startsWith(prefix)) {
        throw new Error("Invalid compressed message format");
      }

      // Remove the "data:application/gzip;base64," part from the message
      const base64Data = compressedMessage.split(",")[1];

      // Decode the base64 string to get the compressed buffer
      const compressedBuffer = Buffer.from(base64Data, "base64");

      // Promisify the gunzip function
      const gunzipAsync = promisify(gunzip);

      // Decompress the buffer
      const decompressedBuffer = await gunzipAsync(compressedBuffer);

      // Convert the buffer back to string
      return decompressedBuffer.toString();
    } catch (error) {
      console.error("Error decoding message:", error);
      throw error;
    }
  }
}
