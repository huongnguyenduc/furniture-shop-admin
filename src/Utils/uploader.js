export async function uploader(file) {
  var result = '';
  const data = new FormData();
  data.append('file', file);
  data.append('upload_preset', 'huybui');
  data.append('cloud_name', 'dthfkshzd');
  await fetch('  https://api.cloudinary.com/v1_1/dthfkshzd/image/upload', {
    method: 'post',
    body: data,
  })
    .then(resp => resp.json())
    .then(data => {
      result = data.url;
    })
    .catch(err => console.log(err));
  return result;
}
