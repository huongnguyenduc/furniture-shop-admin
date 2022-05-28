import axios from "axios";
export async function uploader(file) {
  var result = '';
  const data = new FormData();

  data.append('file', file);
  data.append('upload_preset', 'huybui');
  data.append('cloud_name', 'dthfkshzd');
  await axios.post('https://api.cloudinary.com/v1_1/dthfkshzd/image/upload', data)
    .then(res => {
      result = res.data.url
    })
    .catch(err => console.log(err));
  return result;
}
