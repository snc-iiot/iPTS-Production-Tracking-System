import * as Ftp from 'ftp';
// import * as fs from 'fs';

export function FtpUploadFileFromBase64(
  base64String: string,
  remoteFilePath: string,
) {
  return new Promise(async (resolve, reject) => {
    // connect to FTP server
    const ftpHost = '10.0.0.3';
    const ftpUser = 'SNC_CoDE';
    const ftpPassword = '$nCC0deTe@mS';

    const ftpClient = new Ftp();
    try {
      ftpClient.connect({
        host: ftpHost,
        user: ftpUser,
        password: ftpPassword,
      });
      ftpClient.on('ready', function () {
        //  console.log("Connected to FTP server");
        // const base64Data = "YOUR_BASE64_STRING"; // Replace with your actual base64 string
        const buffer = Buffer.from(base64String, 'base64');
        ftpClient.put(buffer, remoteFilePath, (err) => {
          if (err) reject(err);
          // console.log('Uploaded file successfully');
          resolve(true);
          ftpClient.end();
        });
      });

      ftpClient.on('error', function (err) {
        reject(err);
        ftpClient.end();
      });

      ftpClient.on('end', function () {
        // console.log('Disconnected from FTP server');
      });
      resolve(true);
    } catch (error) {
      // console.error(error);
      //  client.end();
      reject(error);
    }
    // finally {
    //   ftpClient.end();
    // }
  });
}
