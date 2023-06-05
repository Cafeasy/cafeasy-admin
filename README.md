REMEMBER: LAKUKAN PULL TERLEBIH DAHULU SEBELUM PUSH

REQUIRED SYSTEM:

INSTALL NODE JS
buka terminal => npm -v => jika menunjukkan versi npm, berarti instalasi berhasil
opsional, buka terminal => install yarn (npm install --global yarn) => yarn --version
cafeasy-project configure:

npm install
folder node_modules akan tergenerate otomatis
cafeasy-project/frontend configure:

cd frontend
npm install
folder node_modules akan tergenerate otomatis
cek apakah node_modules sudah tergenerate dengan benar pada folder frontend, dengan cara => npm start atau yarn start jika sudah menginstall yarn
jika sukses, maka akan membuka page entry point pada browser
cafeasy-project/backend configure:

cd backend
npm install
folder node_modules akan tergenerate otomatis
cek apakah node_modules sudah tergenerate dengan benar pada folder backend, dengan cara => nodemon index (nodemon sudah terinstall pada project sehingga tidak perlu install lagi)
jika nodemon starting, buka browser => buka localhost:8888 (8888 adalah port yang sudah ditentukan pada file index.js difolder backend)
AKSES LANDINGPAGE:

start backend
start frontend
