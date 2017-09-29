// Encodes the user filepath for different platforms
export function encode (oldPath) {
    let c, newPath = '';
    let tempPath = oldPath.split(path.sep);
    switch (process.platform) {
      case 'win32':
        c = tempPath[0];
        for (let j = 1; j < tempPath.length; j++) {
          newPath = path.join(newPath, encodeURIComponent(tempPath[j]));
        }
        newPath = path.join(c, newPath);
        return newPath;
      default:
        for (let j = 0; j < tempPath.length; j++) {
          newPath = path.join(newPath, encodeURIComponent(tempPath[j]));
        }
        newPath = `/${newPath}`;
        newPath = newPath.replace(/'/g, '\\\'');
        return newPath;
    }
};