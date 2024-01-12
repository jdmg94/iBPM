import {  
  documentDirectory,
  makeDirectoryAsync,
  getInfoAsync,
} from "expo-file-system";

export const prepareCacheDirectory = async () => {
  const target = `${documentDirectory}recordings`;
  const info = await getInfoAsync(target);

  if (!info.exists) {
    await makeDirectoryAsync(target);
  }
};