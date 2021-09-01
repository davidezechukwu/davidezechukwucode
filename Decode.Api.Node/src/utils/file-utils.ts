import path from 'path';

export class FileUtils {
  public static GetClientPath(destination: string, filename: string) {
    var clientPath = destination;
    if ((clientPath[clientPath.length - 1] !== '/') && (clientPath[clientPath.length - 1] !== '/')) {
      clientPath = clientPath + '/';      
    }
    clientPath = clientPath + filename;    
    return clientPath;
  }

  public static GetServerPath(destination: string, filename: string): string {
    destination = path.join(process.env.CAKE_UPLOAD_PATH!,filename);
    destination = path.normalize(destination);
    destination = path.resolve(process.cwd(), destination);
    return destination;
  }

  public static StripOutFilenameInvalidCharacters(filePath: string): string {
    filePath = filePath.replace(/([^a-z0-9]+)/gi, '-');
    return filePath;
  }
}
