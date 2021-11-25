const chalk = require('chalk')
const Jimp = require('jimp')
const http = require('http')
const fs = require('fs');
const url = require('url');
const yargs = require('yargs')
const key = 123
const argv = yargs


.command(
'levantaservidor',
'Comando para levantar servidor',

{
key: {
describe: 'permite validar acceso',
demand: true,
alias: 'k',
},
},

(args) => {
    args.key == key 
    ? 
    http
     .createServer((req, res) => {
       
           // ruta del formulario
        if (req.url == '/') {
            res.writeHead(200, { 'Content-Type': 'text/html' })
            fs.readFile('index.html', 'utf8', (err, html) => {
            res.end(html)
            })
            }
            // ruta de los estilos
            if (req.url == '/estilos') {
            res.writeHead(200, { 'Content-Type': 'text/css' })
            fs.readFile('estilos.css', (err, css) => {
            res.end(css)
            })
            }
             
            //Almacenar en una constante los parámetros recibidos en la consulta
            const params = url.parse(req.url, true).query;
            const url_imagen = params.ruta

            // ruta de la imagen procesada
            if (req.url.includes('/imagen')){
        Jimp.read( url_imagen, 
        (err, imagen) => {
            imagen
        .resize(350, Jimp.AUTO)
        .grayscale()
        .quality(60)
        .writeAsync('newImg.jpg')
        .then(() => {
            fs.readFile('newImg.jpg', (err, Imagen) => {
                // Paso 8
                res.writeHead(200, { 'Content-Type': 'image/jpeg' })
                res.end(Imagen)
            })
        })
        })
            }
        })
        .listen(8080, () => console.log(chalk.green('Server ON')))

    : console.log(chalk.red('KEY INCORRECTA'))
    }
    )
    .help().argv